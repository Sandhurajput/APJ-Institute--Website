// controllers/authController.js
// Authentication controllers for admin signup and login

import { getPrismaClient } from "../config/database.js";
import { generateToken } from "../config/jwt.js";
import { hashPassword, comparePassword } from "../utils/helpers.js";

const prisma = getPrismaClient();

/**
 * Admin Signup
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
export const signup = async (req, res, next) => {
  try {
    const { name, fullName, email, password } = req.body;
    const adminName = (name || fullName || "").trim();
    const adminEmail = (email || "").trim().toLowerCase();

    if (!adminName || !adminEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new admin
    const admin = await prisma.admin.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        // role: "ADMIN",
        //  isActive: true,
      },
    });

    // Generate JWT token
    const token = generateToken(admin.id, admin.email);

    // Return response without password
    const { password: _, ...adminWithoutPassword } = admin;

    res.status(201).json({
      success: true,
      message: "Admin signup successful",
      data: {
        admin: adminWithoutPassword,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin Login
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (email || "").trim().toLowerCase();

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if admin is active only when the schema actually defines it
    if (typeof admin.isActive === "boolean" && !admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    // Compare password
    const isPasswordCorrect = await comparePassword(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(admin.id, admin.email);

    // Return response without password
    const { password: _, ...adminWithoutPassword } = admin;

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        admin: adminWithoutPassword,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Admin Profile
 * GET /api/auth/profile
 * Requires: JWT token
 */
export const getProfile = async (req, res, next) => {
  try {
    const adminId = req.admin.id;

    // Find admin by ID
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Return response without password
    const { password: _, ...adminWithoutPassword } = admin;

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: adminWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Admin Password
 * PUT /api/auth/change-password
 * Requires: JWT token
 * Body: { oldPassword, newPassword }
 */
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    // Validate passwords
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both old and new passwords are required",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Verify old password
    const isOldPasswordCorrect = await comparePassword(oldPassword, admin.password);

    if (!isOldPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  login,
  getProfile,
  changePassword,
};
