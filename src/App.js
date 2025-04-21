import React, { useState } from 'react'; // Načítáme React a useState hook, abychom mohli pracovat se stavem (např. text v inputu a odpověď)

function App() {
  // `input` drží text, co píšeš do input pole
  // `response` drží odpověď z backendu
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  // Funkce, která se spustí, když odešleš formulář
  const handleSubmit = async (e) => {
    e.preventDefault(); // Zabrání, aby se stránka po odeslání formuláře reloadovala

    // Voláme backend (zatím bude běžet na localhost:3001/api/chat)
    const res = await fetch('https://zero01-r6n4.onrender.com/api/chat', {
      method: 'POST', // Posíláme POST požadavek (chceme poslat data)
      headers: { 'Content-Type': 'application/json' }, // Říkáme, že posíláme JSON
      body: JSON.stringify({ message: input }) // Odesíláme objekt s `message`, co napsal uživatel
    });

    // Přijmeme odpověď, přečteme ji jako JSON
    const data = await res.json();

    // Nastavíme odpověď do stavu `response`, aby se mohla zobrazit na stránce
    setResponse(data.reply || JSON.stringify(data)); // `reply` je, co nám vrátí backend
  };

  // Tohle je návratová hodnota komponenty = to, co React vyrenderuje na stránce
  return (
    <div style={{ padding: 30, fontFamily: 'monospace' }}>
      <h1>🖤 Emo AI</h1>

      {/* Formulář, který odesílá handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input
          value={input} // Do inputu vkládáme hodnotu ze stavu
          onChange={(e) => setInput(e.target.value)} // Při každé změně textu to aktualizuje stav
          placeholder="Zeptej se mě..." // Text uvnitř inputu, než tam něco napíšeš
          style={{ width: 300 }}
        />
        <button type="submit">💀 Odeslat</button>
      </form>

      {/* Tady se zobrazí odpověď z backendu */}
      <div style={{ marginTop: 20 }}>
        <strong>Odpověď:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App; // Exportujeme komponentu App, aby ji React mohl použít
