import mongoose from "mongoose";

const resumeChunkSchema = new mongoose.Schema({
  resumeId: { type: String, required: true },
  content: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

export default mongoose.model("ResumeChunk", resumeChunkSchema);
