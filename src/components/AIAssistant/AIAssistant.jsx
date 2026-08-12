import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./AIAssistant.css";

function AIAssistant({ courseTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hi! I'm your AI learning assistant. Ask me anything about "${courseTitle}" or any general doubts you have while learning.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: input,
    courseTitle,
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data?.message || "AI request failed.");
}

const aiText =
  data?.response ||
  "Sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="ai-fab" onClick={() => setIsOpen(true)}>
          <Sparkles size={22} />
          <span>Ask AI</span>
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <Sparkles size={18} />
              <span>Learning Assistant</span>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ${msg.role}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="ai-message assistant typing">Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;