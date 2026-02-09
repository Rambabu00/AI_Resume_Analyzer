import type { AnalysisResult } from "../../types/analysisTypes";
import ScoreBar from "../ui/ScoreBar";
 
const ResultDashboard = ({ result }: { result: AnalysisResult }) => {
  return (
    <div className="glass-card">
      <ScoreBar value={result.matchScore} label="Match Score" />
      <ScoreBar value={result.atsScore} label="ATS Score" />

      <h4>Missing Skills</h4>
      <ul>
        {result.missingSkills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <h4>Suggestions</h4>
      <ul>
        {result.suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <h4>Strengths</h4>
<ul>
  {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
</ul>

<h4>Weaknesses</h4>
<ul>
  {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
</ul>
 
    </div> 
  );
};

export default ResultDashboard;
