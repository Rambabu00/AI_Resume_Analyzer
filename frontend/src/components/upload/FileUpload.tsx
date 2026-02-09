import { useRef, useState, useEffect } from "react";

interface Props {
  onFileChange: (file: File | null) => void;
  resetTrigger: number;
  disabled?: boolean;
}

const FileUpload = ({ onFileChange, resetTrigger, disabled = false }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Reset when parent triggers reset
  useEffect(() => {
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [resetTrigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setFileName(file.name);
      onFileChange(file);

      // 🔥 Allow selecting the same file again
      e.target.value = "";
    }
  };

  return (
    <div className="drop-zone">
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.docx"
        disabled={disabled}
        onChange={handleFileChange}
      />

      {!fileName ? (
        <p
          onClick={() => {
            if (!disabled) inputRef.current?.click();
          }}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          Click to Upload Resume
        </p>
      ) : (
        <div>
          <p>{fileName}</p>
          {!disabled && (
            <small
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => inputRef.current?.click()}
            >
              Change file
            </small>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
