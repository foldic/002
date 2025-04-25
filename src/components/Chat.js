import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const chatLogRef = useRef(null);

  useEffect(() => {
    const pressedKeys = new Set();

    const handleKeyDown = (e) => {
      pressedKeys.add(e.key.toLowerCase());

      if (pressedKeys.has('shift') && pressedKeys.has('a') && pressedKeys.has('d') && pressedKeys.has('m')) {
        navigate('/admin-login');
      }
    };

    const handleKeyUp = (e) => {
      pressedKeys.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [chatHistory]);

  useEffect(() => {
    document.title = "💬 Emo AI – Rozhovor duší";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageToSend = input.trim().split(/\s+/).slice(0, 100).join(" ");

    if (!messageToSend) return;

    setInput(''); // Vyprázdnit input hned po odeslání
    const newHistory = [...chatHistory, { role: "user", content: messageToSend }];

    setIsLoading(true);

    try {
      const res = await fetch('https://zero01-r6n4.onrender.com/api/chat', {
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
      <h1>🔟 Emo AI</h1>

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
        {chatHistory.slice().reverse().map((msg, i) => (
          <p key={i} style={{ color: '#aaa' }}>
            <strong>{msg.role === 'user' ? 'Ty' : 'Emo AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <button onClick={() => navigate('/')} style={buttonStyle}>
        ← zpět do temnoty
      </button>

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
