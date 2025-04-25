import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Hlava() {
  const navigate = useNavigate();

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
        <div className="half left" onClick={() => navigate('/chat')}>
          <span className="hidden-text">Talk to emo AI</span>
        </div>
        <div className="half right" onClick={() => navigate('/portal')}>
          <span className="hidden-text">Enter the void</span>
        </div>
      </div>

      <div className="light-mask"></div>
    </>
  );
}
