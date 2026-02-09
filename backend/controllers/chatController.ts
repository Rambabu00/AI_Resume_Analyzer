import { Request, Response } from "express";
import { chatWithResume } from "../services/llmService";

export const chatController = async (
  req: Request,
  res: Response
) => {
  try {
    const { resumeId, question } = req.body;

    if (!resumeId || !question) {
      return res.status(400).json({
        error: "resumeId and question are required",
      });
    }

    const reply = await chatWithResume(resumeId, question);

    res.json({ answer: reply });

  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
