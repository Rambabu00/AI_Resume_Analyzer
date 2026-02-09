import { Router } from "express";
import { analyzeResume } from "../controllers/analyzeController";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post("/", upload.single("resume"), analyzeResume);

export default router;
