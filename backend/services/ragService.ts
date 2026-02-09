import { v4 as uuidv4 } from "uuid";
import ResumeChunk from "../models/ResumeChunk";
import { generateEmbedding } from "./embeddingService";
import { cosineSimilarity } from "../utils/similarity";

/* ---------------- STORE RESUME ---------------- */

export const storeResumeInVectorDB = async (
  resumeText: string
): Promise<string> => {
  const resumeId = uuidv4();

  const chunks = resumeText.match(/(.|[\r\n]){1,800}/g) || [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    await ResumeChunk.create({
      resumeId,
      content: chunk,
      embedding,
    });
  }

  return resumeId;
};

/* ---------------- RETRIEVE RELEVANT CHUNKS ---------------- */

export const retrieveRelevantChunks = async (
  resumeId: string,
  query: string
): Promise<string> => {
  const queryEmbedding = await generateEmbedding(query);

  const chunks = await ResumeChunk.find({ resumeId });

  const scored = chunks.map(chunk => ({
    content: chunk.content,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  const topChunks = scored.slice(0, 3);

  return topChunks.map(c => c.content).join("\n");
};
