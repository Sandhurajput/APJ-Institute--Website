import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teacher.js";
import contactRoutes from "./routes/contactRoutes.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ALLOWED_ORIGINS,
  "https://apj-institute-website.vercel.app",
  "https://apj-institute-website-git-main-sankusodhis-projects.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]
  .flatMap((value) =>
    value
      ? value.split(",").map((entry) => entry.trim()).filter(Boolean)
      : []
  )
  .filter((value, index, array) => array.indexOf(value) === index);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      const isLocalhost =
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);

      const isVercelPreview = /(?:^|\.)vercel\.app$/i.test(origin);

      if (isLocalhost || isVercelPreview) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-auth-token",
      "X-Requested-With",
    ],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/students", studentAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const fallbackPort = Number(port) + 1;
      console.warn(`Port ${port} is busy, trying ${fallbackPort}`);
      startServer(fallbackPort);
      return;
    }

    console.error(error);
    process.exit(1);
  });
};

startServer(Number(process.env.PORT || 5000));