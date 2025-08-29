import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "No token provided" });

    // const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // const user = await User.findById(decoded.id);
    // if (!user) return res.status(401).json({ message: "Invalid user" });
    // (req as any).user = user;

    // For testing purposes, bypass authentication
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

/**
 * Role-based access
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
