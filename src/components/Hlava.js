import React, { useEffect } from 'react';
import '../App.css';

export default function Hlava({ setMode }) {
  useEffect(() => {
    const mask = document.querySelector('.light-mask');
    const update = (e) => {
      if (mask) {
        mask.style.setProperty('--x', `${e.clientX}px`);
        mask.style.setProperty('--y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return (
    <>
      <div className="container">
        <div className="half left" onClick={() => setMode('chat')}>
          <span className="hidden-text">Talk to emo AI</span>
        </div>
        <div className="half right" onClick={() => setMode('portal')}>
          <span className="hidden-text">Enter the void</span>
        </div>
      </div>

      <div className="light-mask"></div>
    </>
  );
}
