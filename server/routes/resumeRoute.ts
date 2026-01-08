import { Router } from "express";
import { analyzeResume } from "../controllers/resumeController";
import { authenticateToken } from "../middleware/auth";

const router = Router();
// only authenticated users can access this route
router.post("/analyze", authenticateToken, analyzeResume);

export default router;
