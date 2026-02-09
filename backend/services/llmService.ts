import Groq from "groq-sdk";
import { retrieveRelevantChunks } from "./ragService";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
// resume analyzer with prompt
export const analyzeWithLLM = async (
  prompt: string
): Promise<string> => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ updated model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Groq Error:", error.message);
    throw new Error("Failed to analyze resume");
  }
};


 // Resume with chat  using Ai

export const chatWithResume = async (
  resumeId: string,
  question: string
): Promise<string> => {
  const context = await retrieveRelevantChunks(resumeId, question);

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a resume assistant. Answer ONLY using the resume context provided. If not found, say you don't know.",
      },
      {
        role: "user",
        content: `Resume Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  return response.choices[0].message.content || "";
};

