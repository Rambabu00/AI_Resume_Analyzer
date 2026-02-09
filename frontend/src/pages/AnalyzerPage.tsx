import { useState } from "react";
import toast from "react-hot-toast";
import { analyzeResume } from "../services/api";
import type { AnalyzeResponse } from "../types/analysisTypes";

import FileUpload from "../components/upload/FileUpload";
import JobDescriptionInput from "../components/upload/JobDescriptionInput";
import Button from "../components/ui/Button";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ResultDashboard from "../components/dashboard/ResultDashboard";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import ChatSection from "../components/chat/ChatSection";
const AnalyzerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSubmit = async () => {
      if (!file || !jobDescription) {
    const missingFields = [];
    if (!file) missingFields.push("Resume file");
    if (!jobDescription) missingFields.push("Job Description");
    toast.error(`Please provide: ${missingFields.join(", ")}`);
    return;
  }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const data = await analyzeResume(formData);
      setResult(data);

      // clear inputs
      setFile(null);
      setJobDescription("");
      setResetTrigger(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <LoadingOverlay />}

      <DarkModeToggle />

      <h2>AI Resume Analyzer</h2>

      <FileUpload onFileChange={setFile} resetTrigger={resetTrigger} />
  <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
        />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </Button>

    {result && (
  <>
    <ResultDashboard result={result.analysis} />
    <ChatSection resumeId={result.resumeId} />
  </>
)}

    </div>
  );
};

export default AnalyzerPage;
