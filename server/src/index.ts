// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import * as authRoutes from "../routes/authRoutes";
import * as resumeRoutes from "../routes/resumeRoute";
import { authenticateToken } from "../middleware/auth";
dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes.default);
app.use("/api", resumeRoutes.default);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
