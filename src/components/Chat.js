import React, { useState, useEffect, useRef } from 'react';

function Chat({ setMode }) {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const chatLogRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    document.title = "💬 Emo AI – Rozhovor duší";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userMessage = input.trim().split(/\s+/).slice(0, 100).join(" ");
    const newHistory = [...chatHistory, { role: "user", content: userMessage }];

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      });

      if (!res.ok) throw new Error(`Server fail: ${res.status}`);
      const data = await res.json();

      const aiReply = {
        role: "assistant",
        content: data.reply.split(/\s+/).slice(0, 100).join(" ")
      };

      setChatHistory([...newHistory, aiReply]);
      setInput('');
    } catch (err) {
      console.error('Chyba:', err);
      setChatHistory([
        ...newHistory,
        { role: "assistant", content: "💀 Backend je mrtvý, stejně jako naše naděje." }
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="mode-screen">
      <h1>🖤 Emo AI</h1>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zeptej se mě..."
          style={{ width: 300 }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "⌛" : "💀 Odeslat"}
        </button>
      </form>

      <div className="chat-log" ref={chatLogRef}>
        {chatHistory.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role === 'user' ? 'Ty' : 'Emo AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <button onClick={() => setMode('landing')} style={buttonStyle}>
        ← zpět do temnoty
      </button>

      {/* Statistické tlačítko vlevo dole */}
      <button className="analytics-toggle" onClick={() => setShowStats(!showStats)}>
        ℹ️
      </button>

      {showStats && (
        <div className="analytics-popup">
          <p><strong>Návštěvy dnes:</strong> 42</p>
          <p><strong>Celkem návštěv:</strong> 666</p>
          <p><strong>Průměrná délka setrvání:</strong> 6 min 66 sec</p>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid #aaa',
  padding: '8px 16px',
  color: '#eee',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '4px',
  backdropFilter: 'blur(2px)',
  zIndex: 10
};

export default Chat;
