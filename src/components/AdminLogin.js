import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Abrakadabra91-') {
      navigate('/admin-panel');
    } else {
      alert('Špatné heslo!');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Admin Přihlášení</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Zadej tajné heslo"
        />
        <button type="submit">Přihlásit se</button>
      </form>
    </div>
  );
}

export default AdminLogin;
