import { getPrismaClient } from "../config/database.js";
import { generateToken } from "../config/jwt.js";
import { comparePassword, hashPassword } from "../utils/helpers.js";

const prisma = getPrismaClient();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const studentName = (name || "").trim();
    const studentEmail = (email || "").trim().toLowerCase();

    if (!studentName || !studentEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { email: studentEmail },
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const student = await prisma.student.create({
      data: {
        name: studentName,
        email: studentEmail,
        password: hashedPassword,
        isActive: true,
      },
    });

    const token = generateToken({
      id: student.id,
      email: student.email,
      role: "student",
    });

    const { password: _, ...studentData } = student;

    return res.status(201).json({
      success: true,
      token,
      student: studentData,
    });
  } catch (error) {
    console.error("Student signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Student signup failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const studentEmail = (email || "").trim().toLowerCase();

    if (!studentEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const student = await prisma.student.findUnique({
      where: { email: studentEmail },
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (student.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Student account is inactive",
      });
    }

    const isPasswordValid = await comparePassword(password, student.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: student.id,
      email: student.email,
      role: "student",
    });

    const { password: _, ...studentData } = student;

    return res.status(200).json({
      success: true,
      token,
      student: studentData,
    });
  } catch (error) {
    console.error("Student login error:", error);
    return res.status(500).json({
      success: false,
      message: "Student login failed",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { password: _, ...studentData } = student;

    return res.status(200).json({
      success: true,
      student: studentData,
    });
  } catch (error) {
    console.error("Student profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
    });
  }
};

export default {
  signup,
  login,
  getProfile,
};
