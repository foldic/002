import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('landing');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://zero01-r6n4.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setResponse(data.reply || JSON.stringify(data));
  };

  useEffect(() => {
    const mask = document.querySelector('.light-mask');
    const update = (e) => {
      mask.style.setProperty('--x', `${e.clientX}px`);
      mask.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  if (mode === 'chat') {
    return (
      <div style={{ padding: 30, fontFamily: 'monospace', background: '#111', color: '#eee', height: '100vh', position: 'relative' }}>
        <h1>🖤 Emo AI</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zeptej se mě..."
            style={{ width: 300 }}
          />
          <button type="submit">💀 Odeslat</button>
        </form>
        <div style={{ marginTop: 20 }}>
          <strong>Odpověď:</strong>
          <p>{response}</p>
        </div>
        <button
          onClick={() => setMode('landing')}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'transparent',
            border: '1px solid #666',
            padding: '8px 16px',
            color: '#aaa',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '4px',
            backdropFilter: 'blur(2px)'
          }}
        >
          ← zpět do temnoty
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="half left" onClick={() => setMode('chat')}>
        <span className="hidden-text">Talk to emo AI</span>
      </div>
      <div className="half right">
        <span className="hidden-text">Enter the void</span>
      </div>
      <div className="light-mask"></div>
    </div>
  );
}

export default App;