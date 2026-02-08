import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../lib/db";
import { AuthRequest } from "../lib/middleware";
import { paymentsApi } from "../lib/square";
import { v4 as uuidv4 } from "uuid";

const CreatePaymentSchema = z.object({
  sourceId: z.string(), // From Square Web Payments SDK
  packageId: z.string(),
  amount: z.number().positive(), // Amount in cents
});

export const handleCreatePayment: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { sourceId, packageId, amount } = CreatePaymentSchema.parse(
      req.body
    );

    // Get package
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) return res.status(404).json({ error: "Package not found" });

    // Verify amount matches package
    if (BigInt(amount) !== pkg.priceCents) {
      return res.status(400).json({ error: "Amount mismatch" });
    }

    // Create Square payment
    const idempotencyKey = uuidv4();

    try {
      const response = await paymentsApi.createPayment({
        sourceId,
        amountMoney: {
          amount: BigInt(amount),
          currency: "USD",
        },
        idempotencyKey,
        customerId: req.user.userId,
        note: `Gold Coin Purchase - ${pkg.name}`,
      });

      if (!response.result.payment) {
        return res.status(400).json({ error: "Payment creation failed" });
      }

      const payment = response.result.payment;

      // Only process if payment is approved
      if (payment.status !== "COMPLETED") {
        return res.status(400).json({
          error: `Payment not completed. Status: ${payment.status}`,
        });
      }

      // Calculate bonus
      const bonusGold = (pkg.goldAmount * BigInt(pkg.bonusPercentage)) / 100n;
      const bonusSweep =
        (pkg.sweepAmount * BigInt(pkg.bonusPercentage)) / 100n;

      // Update wallet
      const wallet = await prisma.wallet.findUnique({
        where: { userId: req.user.userId },
      });

      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      const updatedWallet = await prisma.wallet.update({
        where: { userId: req.user.userId },
        data: {
          goldCoins: wallet.goldCoins + pkg.goldAmount + bonusGold,
          sweepCoins: wallet.sweepCoins + pkg.sweepAmount + bonusSweep,
        },
      });

      // Create transaction
      await prisma.transaction.create({
        data: {
          userId: req.user.userId,
          type: "PURCHASE",
          amount: pkg.goldAmount,
          currencyType: "GOLD",
          metadata: JSON.stringify({
            packageId,
            packageName: pkg.name,
            bonus: `${pkg.bonusPercentage}%`,
            squarePaymentId: payment.id,
          }),
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: req.user.userId,
          squarePaymentId: payment.id,
          squareOrderId: payment.orderId || undefined,
          amount: BigInt(amount),
          status: "COMPLETED",
          goldCoinsAwarded: pkg.goldAmount + bonusGold,
          sweepCoinsAwarded: pkg.sweepAmount + bonusSweep,
          metadata: JSON.stringify({
            packageId,
            packageName: pkg.name,
          }),
        },
      });

      res.json({
        success: true,
        message: "Payment successful",
        wallet: updatedWallet,
        payment: {
          id: payment.id,
          status: payment.status,
        },
      });
    } catch (squareError: any) {
      console.error("Square API error:", squareError);
      return res.status(400).json({
        error: squareError.message || "Payment processing failed",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Payment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetPaymentHistory: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { limit = "20", offset = "0" } = req.query;
    const pageLimit = parseInt(String(limit));
    const pageOffset = parseInt(String(offset));

    const payments = await prisma.payment.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
      take: pageLimit,
      skip: pageOffset,
    });

    const total = await prisma.payment.count({
      where: { userId: req.user.userId },
    });

    res.json({ payments, total });
  } catch (error) {
    console.error("Get payment history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
