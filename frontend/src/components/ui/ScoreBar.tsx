import { useEffect, useState } from "react";

interface Props {
  value: number;
  label: string;
}

const ScoreBar = ({ value, label }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(value), 200);
  }, [value]);

  const getColor = () => {
    if (value >= 75) return "green";
    if (value >= 50) return "orange";
    return "red";
  };

  return (
    <div className="score-container">
      <div>{label}: {value}%</div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
