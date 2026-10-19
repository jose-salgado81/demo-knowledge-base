import React, { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! How can I help you with xLeap today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.error || 'Error connecting to support.' }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error connecting to support.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="button button--primary button--lg"
          style={{ borderRadius: '50px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        >
          💬 Xleap Support Assistant 
          <span style={{ fontSize: '11px', background: '#ffc107', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>
            BETA
          </span>
        </button>
      ) : (
        <div style={{ width: '320px', height: '420px', background: 'var(--ifm-background-color)', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          
          {/* Chat Header with BETA Badge */}
          <div style={{ padding: '12px 16px', background: 'var(--ifm-color-primary)', color: '#fff', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>XLeap Support Assistant</strong>
              <span style={{ 
                background: '#ffc107', 
                color: '#000', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                padding: '2px 6px', 
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                BETA
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            
            {/* Under Development Warning Notice */}
            <div style={{ background: '#fff3cd', color: '#856404', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', textAlign: 'center', marginBottom: '4px', border: '1px solid #ffeeba' }}>
              ⚠️ Feature under development.
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? 'var(--ifm-color-primary-lightest)' : 'var(--ifm-color-emphasis-100)', color: 'var(--ifm-font-color-base)', padding: '8px 12px', borderRadius: '8px', maxWidth: '80%' }}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ alignSelf: 'flex-start', fontStyle: 'italic', opacity: 0.7 }}>Thinking...</div>}
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid var(--ifm-color-emphasis-200)', padding: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{ flex: 1, border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '4px', padding: '6px 8px', outline: 'none', background: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)' }}
            />
            <button type="submit" className="button button--primary button--sm" style={{ marginLeft: '6px' }}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}