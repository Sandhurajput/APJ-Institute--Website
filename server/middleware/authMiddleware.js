import jwt from "jsonwebtoken";
import { executeQuery } from "../config/db.js";

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
      const adminRows = await executeQuery(
        "SELECT * FROM `Admin` WHERE id = ? LIMIT 1",
        [decoded.id]
      );
      user = adminRows[0];
    } else if (decoded.role === "student") {
      const studentRows = await executeQuery(
        "SELECT * FROM `students` WHERE id = ? LIMIT 1",
        [decoded.id]
      );
      user = studentRows[0];
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
