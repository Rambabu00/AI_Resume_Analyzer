import { useTheme } from "../../context/themeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="toggle-btn" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
};

export default DarkModeToggle;
