import { getPrismaClient } from "../config/database.js";
import { generateToken } from "../config/jwt.js";
import { hashPassword, comparePassword } from "../utils/helpers.js";

const prisma = getPrismaClient();

// Teacher Signup
export const teacherSignup = async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    const existingTeacher = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashedPassword,
        subject,
      },
    });

    const token = generateToken(teacher.id, teacher.email);

    res.status(201).json({
      success: true,
      message: "Teacher signup successful",
      teacher,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Teacher Login
export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { email },
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const isMatch = await comparePassword(
      password,
      teacher.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(teacher.id, teacher.email);

    res.status(200).json({
      success: true,
      message: "Teacher login successful",
      teacher,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};