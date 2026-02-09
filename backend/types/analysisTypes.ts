export interface AnalysisResult {
  matchScore: number;
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsScore: number;
}
