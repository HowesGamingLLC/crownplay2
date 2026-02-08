import { Request, Response, NextFunction } from "express";
import { extractTokenFromHeader, verifyToken } from "./auth";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }

  req.user = decoded;
  next();
}

export function adminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden - Admin access required" });
  }

  next();
}
