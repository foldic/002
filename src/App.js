import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Hlava from './components/Hlava';
import './App.css';

function App() {
  const [mode, setMode] = useState('landing');

  useEffect(() => {
    if (mode === 'landing') {
      document.title = 'makeaible';
    } else if (mode === 'chat') {
      document.title = '💬 Emo AI';
    } else {
      document.title = 'uprav si';
    }
  }, [mode]);

  return (
    <div>
      {mode === 'landing' && <Hlava setMode={setMode} />}
      {mode === 'chat' && <Chat setMode={setMode} />}
    </div>
  );
}

export default App;
