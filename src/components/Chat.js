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
      requestAnimationFrame(() => {
        chatLogRef.current.scrollTop = 0;
      });
    }
  }, [chatHistory]);
  

  useEffect(() => {
    document.title = "\uD83D\uDCAC Emo AI – Rozhovor duší";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = input.trim();
    if (!userMessage) return;

    const updatedHistory = [...chatHistory, { role: 'user', content: userMessage }];

    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://zero01-r6n4.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory })
      });

      if (!res.ok) throw new Error(`Server fail: ${res.status}`);
      const data = await res.json();

      const aiReply = {
        role: 'assistant',
        content: data.reply
      };

      setChatHistory([...updatedHistory, aiReply]);

    } catch (err) {
      console.error('Chyba:', err);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: '\uD83D\uDC80 Backend je mrtv\u00fd, stejn\u011b jako na\u0161e nad\u011bje.' }
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="mode-screen">
      <h1>\uD83D\uDD1F Emo AI</h1>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zeptej se m\u011b..."
          style={{ width: 300 }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "\u231B" : "\uD83D\uDC80 Odeslat"}
        </button>
      </form>

      <div className="chat-log" ref={chatLogRef}>
        {chatHistory.map((msg, i) => (
          <p key={i} style={{ color: '#aaa' }}>
            <strong>{msg.role === 'user' ? 'Ty' : 'Emo AI'}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <button onClick={() => navigate('/')} style={buttonStyle}>
        \u2190 zp\u011bt do temnoty
      </button>

      <button className="analytics-toggle" onClick={() => setShowStats(!showStats)}>
        \u2139\ufe0f
      </button>

      {showStats && (
        <div className="analytics-popup">
          <p><strong>N\u00e1v\u0161t\u011bvy dnes:</strong> 42</p>
          <p><strong>Celkem n\u00e1v\u0161t\u011bv:</strong> 666</p>
          <p><strong>Pr\u016fm\u011brn\u00e1 d\u00e9lka setrv\u00e1n\u00ed:</strong> 6 min 66 sec</p>
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
