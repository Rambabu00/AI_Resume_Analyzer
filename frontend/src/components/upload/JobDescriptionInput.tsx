interface Props {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: Props) => {
  return (
    <div className="input-group">
      <label className="label">Job Description</label>
      <textarea
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="textarea"
        placeholder="Paste job description here..."
      />
    </div>
  );
};

export default JobDescriptionInput;
