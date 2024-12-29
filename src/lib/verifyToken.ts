// src/lib/verifyToken.ts
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("jwt verification failed:", error);
    return null;
  }
}
