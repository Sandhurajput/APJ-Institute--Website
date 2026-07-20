import { executeQuery } from "../config/db.js";
import { generateToken } from "../config/jwt.js";
import { comparePassword, hashPassword } from "../utils/helpers.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminName = (name || "").trim();
    const adminEmail = (email || "").trim().toLowerCase();

    if (!adminName || !adminEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingRows = await executeQuery(
      "SELECT * FROM `Admin` WHERE email = ? LIMIT 1",
      [adminEmail]
    );
    const existingAdmin = existingRows[0];

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    await executeQuery(
      "INSERT INTO `Admin` (name, email, password, role, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [adminName, adminEmail, hashedPassword, "admin", true]
    );

    const adminRows = await executeQuery(
      "SELECT * FROM `Admin` WHERE id = LAST_INSERT_ID() LIMIT 1"
    );
    const admin = adminRows[0];

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "admin",
    });

    const { password: _, ...adminData } = admin;

    return res.status(201).json({
      success: true,
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Admin signup failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, passkey, adminPasskey } = req.body;
    const adminEmail = (email || "").trim().toLowerCase();
    const providedPasskey = (passkey || adminPasskey || "").trim();

    if (!adminEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const adminPasscode = process.env.ADMIN_PASSKEY || "penal";
    const allowPasskeyLogin = providedPasskey && providedPasskey === adminPasscode;

    const adminRows = await executeQuery(
      "SELECT * FROM `Admin` WHERE email = ? LIMIT 1",
      [adminEmail]
    );
    let admin = adminRows[0];

    if (!admin && allowPasskeyLogin) {
      const hashedPassword = await hashPassword(password);
      await executeQuery(
        "INSERT INTO `Admin` (name, email, password, role, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [adminEmail.split("@")[0], adminEmail, hashedPassword, "admin", true]
      );

      const createdAdminRows = await executeQuery(
        "SELECT * FROM `Admin` WHERE id = LAST_INSERT_ID() LIMIT 1"
      );
      admin = createdAdminRows[0];
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (admin.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid && !allowPasskeyLogin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "admin",
    });

    const { password: _, ...adminData } = admin;

    return res.status(200).json({
      success: true,
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Admin login failed",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const adminRows = await executeQuery(
      "SELECT * FROM `Admin` WHERE id = ? LIMIT 1",
      [adminId]
    );
    const admin = adminRows[0];

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const { password: _, ...adminData } = admin;

    return res.status(200).json({
      success: true,
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both old and new passwords are required",
      });
    }

    const adminRows = await executeQuery(
      "SELECT * FROM `Admin` WHERE id = ? LIMIT 1",
      [adminId]
    );
    const admin = adminRows[0];

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isPasswordValid = await comparePassword(oldPassword, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await executeQuery(
      "UPDATE `Admin` SET password = ?, updatedAt = NOW() WHERE id = ?",
      [hashedPassword, adminId]
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Admin password change error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export default {
  signup,
  login,
  getProfile,
  changePassword,
};
