import React, { useState } from 'react';

export default function Root({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.text || data.error }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error connecting to support.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children}
      <div style={styles.container}>
        {!isOpen ? (
          <button onClick={() => setIsOpen(true)} style={styles.toggleBtn}>
            💬 AI Support
          </button>
        ) : (
          <div style={styles.window}>
            <div style={styles.header}>
              <span>KB Support Assistant</span>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.messages}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ ...styles.msg, ...(m.sender === 'user' ? styles.userMsg : styles.botMsg) }}>
                  {m.text}
                </div>
              ))}
              {loading && <div style={{ ...styles.msg, ...styles.botMsg }}>Thinking...</div>}
            </div>
            <form onSubmit={sendMessage} style={styles.form}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                style={styles.input}
              />
              <button type="submit" style={styles.sendBtn}>Send</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: { position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'sans-serif' },
  toggleBtn: { backgroundColor: '#25c2a0', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  window: { width: '320px', height: '400px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #ddd' },
  header: { backgroundColor: '#25c2a0', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' },
  messages: { flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f9f9f9' },
  msg: { padding: '8px 12px', borderRadius: '8px', maxWidth: '80%', fontSize: '14px', lineHeight: '1.4' },
  userMsg: { backgroundColor: '#25c2a0', color: '#fff', alignSelf: 'flex-end' },
  botMsg: { backgroundColor: '#e2e8f0', color: '#333', alignSelf: 'flex-start' },
  form: { display: 'flex', borderTop: '1px solid #ddd', padding: '8px', backgroundColor: '#fff' },
  input: { flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '8px', outline: 'none', fontSize: '14px' },
  sendBtn: { backgroundColor: '#25c2a0', color: '#fff', border: 'none', padding: '0 12px', marginLeft: '6px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};