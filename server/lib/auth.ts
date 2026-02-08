import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(
  userId: string,
  role: string,
): { token: string; expiresIn: string } {
  const token = jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
  return { token, expiresIn: JWT_EXPIRY };
}

export function verifyToken(
  token: string,
): { userId: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(
  authHeader: string | undefined,
): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return null;
  }
  return parts[1];
}
