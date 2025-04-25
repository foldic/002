import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch('http://localhost:3001/api/getAllChats');
      const data = await res.json();
      setChats(data);
    };

    fetchChats();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#111', color: '#aaa' }}>
      <h1>Všechny Chaty</h1>
      <table border="1" cellPadding="5" style={{ width: '100%', color: '#aaa', backgroundColor: '#222' }}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Obsah</th>
            <th>Čas</th>
          </tr>
        </thead>
        <tbody>
          {chats.map((chat, index) => (
            <tr key={index}>
              <td>{chat.role}</td>
              <td>{chat.content}</td>
              <td>{new Date(chat.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
