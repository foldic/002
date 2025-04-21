import React from 'react';

function Portal({ setMode }) {
  return (
    <div className="mode-screen">
      <h1>🌀 Tady bude tvůj osobní AI portál</h1>
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

export default Portal;
