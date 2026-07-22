import { executeQuery } from "../config/db.js";
import { generateToken } from "../config/jwt.js";
import { hashPassword, comparePassword } from "../utils/helpers.js";

// Teacher Signup
export const teacherSignup = async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    const existingRows = await executeQuery(
      "SELECT * FROM `Teacher` WHERE email = ? LIMIT 1",
      [email]
    );
    const existingTeacher = existingRows[0];

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    await executeQuery(
      "INSERT INTO `Teacher` (name, email, password, subject, createdAt) VALUES (?, ?, ?, ?, NOW())",
      [name, email, hashedPassword, subject]
    );

    const teacherRows = await executeQuery(
      "SELECT * FROM `Teacher` WHERE id = LAST_INSERT_ID() LIMIT 1"
    );
    const teacher = teacherRows[0];

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

    const teacherRows = await executeQuery(
      "SELECT * FROM `Teacher` WHERE email = ? LIMIT 1",
      [email]
    );
    const teacher = teacherRows[0];

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const isMatch = await comparePassword(password, teacher.password);

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