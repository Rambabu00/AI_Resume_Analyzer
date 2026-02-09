export interface AnalysisResult {
  matchScore: number;
  atsScore: number;
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface AnalyzeResponse {
  resumeId: string;
  analysis: AnalysisResult;
}
