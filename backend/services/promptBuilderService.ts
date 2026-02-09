export const buildPrompt = (
  resumeText: string,
  jobDescription: string
): string => {
  return `
You are a senior HR specialist and ATS resume evaluator.

TASK:
Evaluate how well the resume matches the job description.

STRICT OUTPUT RULES:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use backticks.
- Do NOT add explanations.
- Do NOT add text before or after JSON.
- Output MUST start with { and end with }.
- All scores MUST be integers.
- matchScore must be between 0 and 100.
- atsScore must be between 0 and 100.

SCORING LOGIC:
- matchScore: Overall alignment of skills, experience, and responsibilities.
- atsScore: Keyword optimization and ATS compatibility.
- missingSkills: Skills present in job description but absent in resume.
- strengths: Strong alignment areas.
- weaknesses: Clear gaps or weaknesses.
- suggestions: Actionable improvements to improve matchScore.

OUTPUT FORMAT:
{
  "matchScore": number,
  "missingSkills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "atsScore": number
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;
};
