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
            💬 Chatbot Support <span style={styles.badge}>BETA</span>
          </button>
        ) : (
          <div style={styles.window}>
            <div style={styles.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>KB Support Assistant</span>
                <span style={styles.badge}>BETA</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.messages}>
              {/* Beta Warning Notice Banner */}
              <div style={styles.banner}>
                ⚠️ Feature under development. It will take the question .
              </div>

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
  toggleBtn: { backgroundColor: '#25c2a0', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'inline-flex', alignItems: 'center', gap: '6px' },
  badge: { backgroundColor: '#ffc107', color: '#000', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.5px' },
  window: { width: '320px', height: '420px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #ddd' },
  header: { backgroundColor: '#25c2a0', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' },
  messages: { flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f9f9f9' },
  banner: { backgroundColor: '#fff3cd', color: '#856404', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', textAlign: 'center', border: '1px solid #ffeeba', marginBottom: '4px' },
  msg: { padding: '8px 12px', borderRadius: '8px', maxWidth: '80%', fontSize: '14px', lineHeight: '1.4' },
  userMsg: { backgroundColor: '#25c2a0', color: '#fff', alignSelf: 'flex-end' },
  botMsg: { backgroundColor: '#e2e8f0', color: '#333', alignSelf: 'flex-start' },
  form: { display: 'flex', borderTop: '1px solid #ddd', padding: '8px', backgroundColor: '#fff' },
  input: { flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '8px', outline: 'none', fontSize: '14px' },
  sendBtn: { backgroundColor: '#25c2a0', color: '#fff', border: 'none', padding: '0 12px', marginLeft: '6px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};