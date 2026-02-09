import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  content: string;
};

interface Props {
  resumeId: string;
}

 const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


const ChatSection = ({ resumeId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
// Reset chat when resume changes
useEffect(() => {
  setMessages([]);
}, [resumeId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  // Auto focus when typing finishes
  useEffect(() => {
    if (!loading && !isTyping) {
      inputRef.current?.focus();
    }
  }, [loading, isTyping]);

  // Typing animation
  const typeText = (text: string) => {
    let index = 0;
    setTypingText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      setTypingText((prev) => prev + text[index]);
      index++;

      if (index >= text.length) {
        clearInterval(interval);

        setMessages((prev) => [
          ...prev,
          { role: "ai", content: text },
        ]);

        setTypingText("");
        setIsTyping(false);
      }
    }, 15);
  };

  const sendMessage = async () => {
    if (!input.trim() || !resumeId || loading || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await API.post("/chat", {
        resumeId,
        question: userMessage.content,
      });

      const aiText =
        response.data.answer || "No response received.";

      typeText(aiText);
    } catch (error) {
      typeText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container glass-card">
      <div className="chat-header">
        <h3>AI Resume Assistant</h3>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.role === "user"
                ? "user-bubble"
                : "ai-bubble"
            }`}
          >
            {msg.role === "ai" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}

        {/* Typing Animation Bubble */}
        {isTyping && (
          <div className="chat-bubble ai-bubble">
            <ReactMarkdown>{typingText}</ReactMarkdown>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && !isTyping && (
          <div className="chat-bubble ai-bubble typing">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask something about your resume..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || isTyping}
        />

        <button
          onClick={sendMessage}
          disabled={loading || isTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
