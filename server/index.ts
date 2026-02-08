import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleSignup,
  handleLogin,
  handleLogout,
  handleCurrentUser,
} from "./routes/auth";
import {
  handleGetTransactions as playerGetTransactions,
  handlePurchasePackage,
  handleRequestRedemption,
  handleGetRedemptions as playerGetRedemptions,
  handleGetGames,
  handleGetPromotions,
  handleGetPackages,
} from "./routes/player";
import {
  handleGetDashboardKPIs,
  handleGetUsers,
  handleUpdateUserBalance,
  handleUpdateUserStatus,
  handleGetTransactions as adminGetTransactions,
  handleGetRedemptions as adminGetRedemptions,
  handleUpdateRedemption,
} from "./routes/admin";
import { authMiddleware, adminMiddleware } from "./lib/middleware";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/me", authMiddleware, handleCurrentUser);

  // Player routes
  app.get("/api/player/transactions", authMiddleware, playerGetTransactions);
  app.post("/api/player/purchase", authMiddleware, handlePurchasePackage);
  app.post(
    "/api/player/redemption/request",
    authMiddleware,
    handleRequestRedemption
  );
  app.get("/api/player/redemptions", authMiddleware, playerGetRedemptions);

  // Public game/package routes
  app.get("/api/games", handleGetGames);
  app.get("/api/promotions", handleGetPromotions);
  app.get("/api/packages", handleGetPackages);

  // Admin routes
  app.get("/api/admin/dashboard/kpis", authMiddleware, adminMiddleware, handleGetDashboardKPIs);
  app.get("/api/admin/users", authMiddleware, adminMiddleware, handleGetUsers);
  app.patch(
    "/api/admin/users/:userId/balance",
    authMiddleware,
    adminMiddleware,
    handleUpdateUserBalance
  );
  app.patch(
    "/api/admin/users/:userId/status",
    authMiddleware,
    adminMiddleware,
    handleUpdateUserStatus
  );
  app.get("/api/admin/transactions", authMiddleware, adminMiddleware, adminGetTransactions);
  app.get("/api/admin/redemptions", authMiddleware, adminMiddleware, adminGetRedemptions);
  app.patch(
    "/api/admin/redemptions/:redemptionId",
    authMiddleware,
    adminMiddleware,
    handleUpdateRedemption
  );

  return app;
}
