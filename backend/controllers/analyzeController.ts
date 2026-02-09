import { Request, Response } from "express";
import { parseResume } from "../services/fileParserService";
import { buildPrompt } from "../services/promptBuilderService";
import { analyzeWithLLM } from "../services/llmService";
import { storeResumeInVectorDB } from "../services/ragService";
import { AnalysisResult } from "../types/analysisTypes";

export const analyzeResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      res.status(400).json({ error: "Resume file is required" });
      return;
    }

    if (!jobDescription) {
      res.status(400).json({ error: "Job description is required" });
      return;
    }

    // 1️⃣ Extract resume text
    const resumeText = await parseResume(file);

    // 2️⃣ Build prompt
    const prompt = buildPrompt(resumeText, jobDescription);

    // 3️⃣ Call LLM
    const llmResponse = await analyzeWithLLM(prompt);

    // 4️⃣ Safe JSON parsing (important)
    let parsedJSON: AnalysisResult;

    try {
      parsedJSON = JSON.parse(llmResponse);
    } catch {
      // If model accidentally returns markdown or broken JSON
      const cleaned = llmResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedJSON = JSON.parse(cleaned);
    }

    // 5️⃣ Store resume chunks for RAG
    const resumeId = await storeResumeInVectorDB(resumeText);

    // 6️⃣ Return both analysis + resumeId
    res.json({
      resumeId,
      analysis: parsedJSON,
    });

  } catch (error: any) {
    console.error("Analyze Error:", error);
    res.status(500).json({ error: error.message });
  }
};
