import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const chatLogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = "💬 Emo AI – Rozhovor duší";
  }, []);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatHistory]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = input.trim();
    if (!userMessage) return;

    const newUserMessage = { role: 'user', content: userMessage };

    setInput('');
    setIsLoading(true);
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const res = await fetch('https://zero01-r6n4.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatHistory, newUserMessage] }),
      });

      if (!res.ok) throw new Error(`Server fail: ${res.status}`);
      const data = await res.json();

      const aiReply = { role: 'assistant', content: data.reply };

      setChatHistory(prev => [...prev, aiReply]);
    } catch (err) {
      console.error('Chyba:', err);
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: '💀 Backend je mrtvý, stejně jako naše naděje.' }
      ]);
    }

    setIsLoading(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mode-screen">
      <h1>🖤 Emo AI</h1>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zeptej se mě..."
          style={{ width: 300 }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "⌛" : "💀 Odeslat"}
        </button>
      </form>

      <div
        className="chat-log"
        ref={chatLogRef}
        style={{
          overflowY: 'auto',
          maxHeight: '400px',
          marginTop: '20px',
          border: '1px solid #333',
          padding: '10px',
          backgroundColor: '#222',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >

        {chatHistory.map((msg, i) => (
          <p key={i} style={{ color: '#aaa', margin: '10px 0' }}>
            <strong>{msg.role === 'user' ? 'Ty' : 'Emo AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <button onClick={() => navigate('/')} style={backButtonStyle}>
        ← zpět do temnoty
      </button>

      <button className="analytics-toggle" onClick={() => setShowStats(!showStats)} style={infoButtonStyle}>
        ℹ️
      </button>

      {showStats && (
        <div className="analytics-popup" style={analyticsPopupStyle}>
          <p><strong>Návštěvy dnes:</strong> 42</p>
          <p><strong>Celkem návštěv:</strong> 666</p>
          <p><strong>Průměrná délka setrvání:</strong> 6 min 66 sec</p>
        </div>
      )}
    </div>
  );
}

const backButtonStyle = {
  position: 'fixed',
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

const infoButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  background: '#222',
  color: '#fff',
  border: 'none',
  padding: '10px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '20px',
  zIndex: 20
};

const analyticsPopupStyle = {
  position: 'fixed',
  bottom: '80px',
  left: '20px',
  background: '#333',
  color: '#eee',
  padding: '15px',
  borderRadius: '8px',
  zIndex: 20,
  width: '200px'
};

export default Chat;
