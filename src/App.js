import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Chat from './components/Chat';
import Hlava from './components/Hlava';
import Portal from './components/Portal';
import './App.css';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  // ⏹️ Odeslání informace o odchodu uživatele při zavření stránky
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon("/api/leave", "");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'makeaible';
    } else if (location.pathname === '/chat') {
      document.title = '💬 Emo AI';
    } else if (location.pathname === '/Portal') {
      document.title = '🌌 Portal';
    } else {
      document.title = 'uprav si';
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
        <Route path="/Portal" element={<PageWrapper><Portal /></PageWrapper>} />
        <Route path="/admin-login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
        <Route path="/admin-panel" element={<PageWrapper><AdminPanel /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const navigate = useNavigate();

  // 📥 Započítání návštěvy při načtení úvodní stránky
  useEffect(() => {
    fetch("/api/visit", { method: "POST" })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Hlava />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div
          onClick={handleClick}
          style={{
            width: '50%',
            backgroundColor: '#d0e0ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Klikni sem pro CHAT
        </div>
        <div style={{ width: '50%', backgroundColor: '#f0f0f0' }}>
          {/* Pravá část */}
        </div>
      </div>
    </div>
  );
}

export default App;
