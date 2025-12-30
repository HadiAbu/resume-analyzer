// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
// import { register, login } from "../controllers/authController";/
import * as authRoutes from "../routes/authRoutes";
import { analyzeResume } from "../controllers/resumeController";
import { authenticateToken } from "../middleware/auth";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes.default);

// app.post(
//   "/api/analyze",
//   authenticateToken,
//   upload.single("resume"),
//   analyzeResume
// );

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
