import express from "express";
import cors from "cors";
import dotenv from "dotenv";
 
import analyzeRoutes from "./routes/analyzeRoutes"; // note the .js after TS compile
import chatRoutes from "./routes/chatRoutes";
import { connectDB } from "./config/db";
dotenv.config();
const app = express();


 // Connect MongoDB FIRST
connectDB();

 
// Middleware
 app.use(
  cors()
);

app.use(express.json());
 

// API for resume analysis
app.use("/api/analyze", analyzeRoutes);
// API for chat
app.use("/api/chat", chatRoutes);
 

 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
