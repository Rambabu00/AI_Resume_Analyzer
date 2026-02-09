import axios from "axios";
import type { AnalyzeResponse } from "../types/analysisTypes";

 const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const analyzeResume = async (
  formData: FormData
): Promise<AnalyzeResponse> => {
  const response = await API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
