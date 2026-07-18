import jwt from "jsonwebtoken";
import { getPrismaClient } from "../config/database.js";

const prisma = getPrismaClient();

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "apj-secret");

    if (!decoded?.id || !decoded?.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    let user = null;

    if (decoded.role === "admin") {
      user = await prisma.admin.findUnique({ where: { id: decoded.id } });
    } else if (decoded.role === "student") {
      user = await prisma.student.findUnique({ where: { id: decoded.id } });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = { ...decoded, ...user };
    req.admin = decoded.role === "admin" ? req.user : null;
    req.student = decoded.role === "student" ? req.user : null;

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;
