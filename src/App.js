import React, { useState,} from 'react';
import './App.css';

// Načteme tvé temné děti
import Hlava from './components/Hlava';
import Chat from './components/Chat';
import Portal from './components/Portal';

function App() {
  const [mode, setMode] = useState('landing');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  return (
    <>
      {mode === 'landing' && <Hlava setMode={setMode} />}
      {mode === 'chat' && <Chat setMode={setMode} input={input} setInput={setInput} response={response} setResponse={setResponse} />}
      {mode === 'portal' && <Portal setMode={setMode} />}
    </>
  );
}
export default App;
