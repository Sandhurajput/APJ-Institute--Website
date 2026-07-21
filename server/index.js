import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
// Allow cross-origin requests from local frontend dev servers on any port.
app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});