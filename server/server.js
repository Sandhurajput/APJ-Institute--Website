import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoutes.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/students", studentAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
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