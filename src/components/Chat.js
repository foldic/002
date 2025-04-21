import React from 'react';

function Chat({ setMode, input, setInput, response, setResponse }) {
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
