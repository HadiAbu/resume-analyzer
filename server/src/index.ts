import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import * as authRoutes from "../routes/authRoutes";
import * as resumeRoutes from "../routes/resumeRoute";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes.default);
app.use("/api", resumeRoutes.default);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
