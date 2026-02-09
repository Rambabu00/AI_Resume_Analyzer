import { ThemeProvider } from "./context/themeContext";
import AnalyzerPage from "./pages/AnalyzerPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <ThemeProvider>
      <AnalyzerPage />
         <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
            fontWeight: '600',
            padding: '12px 16px',
          },
        }}
      />
    </ThemeProvider>
  );
};

export default App;



 
