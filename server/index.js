import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
// Allow cross-origin requests from the frontend dev server
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});