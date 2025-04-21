import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('landing');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  // Světlo na myši
  useEffect(() => {
    const mask = document.querySelector('.light-mask');
    const update = (e) => {
      if (mask) {
        mask.style.setProperty('--x', `${e.clientX}px`);
        mask.style.setProperty('--y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', update);
    return () => {
      window.removeEventListener('mousemove', update);
    };
  }, []);

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

  return (
    <>
      {mode === 'landing' && (
        <div className="container">
          <div className="half left" onClick={() => setMode('chat')}>
            <span className="hidden-text">Talk to emo AI</span>
          </div>
          <div className="half right" onClick={() => setMode('portal')}>
            <span className="hidden-text">Enter the void</span>
          </div>
        </div>
      )}

      {mode === 'chat' && (
        <div className="mode-screen">
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
          <button onClick={() => setMode('landing')} style={buttonStyle}>
            ← zpět do temnoty
          </button>
        </div>
      )}

      {mode === 'portal' && (
        <div className="mode-screen">
          <h1>🌀 Tady bude tvůj osobní AI portál</h1>
          <button onClick={() => setMode('landing')} style={buttonStyle}>
            ← zpět do temnoty
          </button>
        </div>
      )}

      {/* Baterka */}
      <div
        className="light-mask"
        style={{ display: mode === 'landing' ? 'block' : 'none' }}
      ></div>
    </>
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

export default App;
