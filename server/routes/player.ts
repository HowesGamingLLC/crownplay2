import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../lib/db";
import { AuthRequest } from "../lib/middleware";

export const handleGetTransactions: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { limit = "10", offset = "0" } = req.query;
    const pageLimit = parseInt(String(limit));
    const pageOffset = parseInt(String(offset));

    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
      take: pageLimit,
      skip: pageOffset,
    });

    const total = await prisma.transaction.count({
      where: { userId: req.user.userId },
    });

    res.json({ transactions, total });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const PurchasePackageSchema = z.object({
  packageId: z.string(),
});

export const handlePurchasePackage: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { packageId } = PurchasePackageSchema.parse(req.body);

    // Get package
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) return res.status(404).json({ error: "Package not found" });

    // Get wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Calculate bonus
    const bonusGold = (pkg.goldAmount * BigInt(pkg.bonusPercentage)) / 100n;
    const bonusSweep = (pkg.sweepAmount * BigInt(pkg.bonusPercentage)) / 100n;

    // Update wallet
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
        }),
      },
    });

    res.json({
      message: "Purchase successful",
      wallet: updatedWallet,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Purchase error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const RequestRedemptionSchema = z.object({
  amount: z.number().positive(),
});

export const handleRequestRedemption: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { amount } = RequestRedemptionSchema.parse(req.body);

    // Get wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Check balance
    if (wallet.sweepCoins < BigInt(amount)) {
      return res.status(400).json({ error: "Insufficient sweep coins" });
    }

    // Create redemption request
    const redemption = await prisma.redemptionRequest.create({
      data: {
        userId: req.user.userId,
        amount: BigInt(amount),
        status: "PENDING",
      },
    });

    res.status(201).json(redemption);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Redemption error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetRedemptions: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const redemptions = await prisma.redemptionRequest.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ redemptions });
  } catch (error) {
    console.error("Get redemptions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetGames: RequestHandler = async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    res.json({ games });
  } catch (error) {
    console.error("Get games error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetPromotions: RequestHandler = async (req, res) => {
  try {
    const now = new Date();
    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true,
        startAt: { lte: now },
        endAt: { gte: now },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ promotions });
  } catch (error) {
    console.error("Get promotions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetPackages: RequestHandler = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { priceCents: "asc" },
    });

    res.json({ packages });
  } catch (error) {
    console.error("Get packages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
