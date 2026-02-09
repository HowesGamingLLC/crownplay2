import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../lib/db";
import { AuthRequest } from "../lib/middleware";

// Get Dashboard KPIs
export const handleGetDashboardKPIs: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        transactions: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        },
      },
    });

    const totalGoldCoins = await prisma.wallet.aggregate({
      _sum: { goldCoins: true },
    });

    const totalSweepCoins = await prisma.wallet.aggregate({
      _sum: { sweepCoins: true },
    });

    const pendingRedemptions = await prisma.redemptionRequest.count({
      where: { status: "PENDING" },
    });

    res.json({
      totalUsers,
      activeUsers,
      totalGoldCoins: totalGoldCoins._sum.goldCoins || 0,
      totalSweepCoins: totalSweepCoins._sum.sweepCoins || 0,
      pendingRedemptions,
    });
  } catch (error) {
    console.error("Dashboard KPI error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Users List
export const handleGetUsers: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { search = "", limit = "10", offset = "0" } = req.query;
    const pageLimit = parseInt(String(limit));
    const pageOffset = parseInt(String(offset));

    const where = search
      ? {
          OR: [
            {
              email: { contains: String(search), mode: "insensitive" as const },
            },
            {
              profile: {
                name: {
                  contains: String(search),
                  mode: "insensitive" as const,
                },
              },
            },
          ],
        }
      : {};

    const users = await prisma.user.findMany({
      where,
      include: { profile: true, wallet: true },
      orderBy: { createdAt: "desc" },
      take: pageLimit,
      skip: pageOffset,
    });

    const total = await prisma.user.count({ where });

    res.json({ users, total });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update User Balance
const UpdateBalanceSchema = z.object({
  goldCoins: z.number().optional(),
  sweepCoins: z.number().optional(),
  reason: z.string().min(1, "Reason is required"),
});

export const handleUpdateUserBalance: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const { userId } = req.params;
    const { goldCoins, sweepCoins, reason } = UpdateBalanceSchema.parse(
      req.body,
    );

    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const updates: any = {};
    if (goldCoins !== undefined) {
      // Convert to integer to avoid BigInt conversion errors
      const amount = Math.trunc(goldCoins);
      updates.goldCoins = wallet.goldCoins + BigInt(amount);
    }
    if (sweepCoins !== undefined) {
      // Convert to integer to avoid BigInt conversion errors
      const amount = Math.trunc(sweepCoins);
      updates.sweepCoins = wallet.sweepCoins + BigInt(amount);
    }

    const updatedWallet = await prisma.wallet.update({
      where: { userId },
      data: updates,
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: req.user?.userId,
        action: "UPDATE_BALANCE",
        targetType: "USER",
        targetId: userId,
        metadata: JSON.stringify({ goldCoins, sweepCoins, reason }),
      },
    });

    res.json(updatedWallet);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Update balance error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lock/Unlock User
const UpdateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "LOCKED", "SUSPENDED"]),
});

export const handleUpdateUserStatus: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const { userId } = req.params;
    const { status } = UpdateUserStatusSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { status },
      include: { profile: true, wallet: true },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: req.user?.userId,
        action: "UPDATE_STATUS",
        targetType: "USER",
        targetId: userId,
        metadata: JSON.stringify({ status }),
      },
    });

    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Update status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Transactions
export const handleGetTransactions: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const { limit = "20", offset = "0" } = req.query;
    const pageLimit = parseInt(String(limit));
    const pageOffset = parseInt(String(offset));

    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: pageLimit,
      skip: pageOffset,
      include: { user: { include: { profile: true } } },
    });

    const total = await prisma.transaction.count();

    res.json({ transactions, total });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Redemptions
export const handleGetRedemptions: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const { status, limit = "20", offset = "0" } = req.query;
    const pageLimit = parseInt(String(limit));
    const pageOffset = parseInt(String(offset));

    const where = status ? { status: String(status) } : {};

    const redemptions = await prisma.redemptionRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pageLimit,
      skip: pageOffset,
      include: { user: { include: { profile: true } } },
    });

    const total = await prisma.redemptionRequest.count({ where });

    res.json({ redemptions, total });
  } catch (error) {
    console.error("Get redemptions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Redemption Status
const UpdateRedemptionSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED"]),
  notes: z.string().optional(),
});

export const handleUpdateRedemption: RequestHandler = async (
  req: AuthRequest,
  res,
) => {
  try {
    const { redemptionId } = req.params;
    const { status, notes } = UpdateRedemptionSchema.parse(req.body);

    // Fetch existing redemption first
    const existing = await prisma.redemptionRequest.findUnique({
      where: { id: redemptionId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Redemption not found" });
    }

    const redemption = await prisma.redemptionRequest.update({
      where: { id: redemptionId },
      data: { status, notes: notes ?? existing.notes },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminId: req.user?.userId,
        action: "UPDATE_REDEMPTION",
        targetType: "REDEMPTION",
        targetId: redemptionId,
        metadata: JSON.stringify({ status, notes }),
      },
    });

    res.json(redemption);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input" });
    }
    console.error("Update redemption error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
