import React from 'react';
import { useNavigate } from 'react-router-dom';

function Portal() {
  const navigate = useNavigate();

  return (
    <div className="mode-screen">
      <h1>🌀 Tady bude tvůj osobní AI portál</h1>
      <button onClick={() => navigate('/')} style={buttonStyle}>
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
