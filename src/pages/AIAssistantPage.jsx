import { useState } from 'react';

const starter = {
  role: 'assistant',
  content:
    'Hello! I am the College AI Assistant. Ask me about survey steps, ratings, contacts, or portal navigation.'
};

function AIAssistantPage() {
  const [messages, setMessages] = useState([starter]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'No response from assistant.' }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Backend proxy is unavailable. Start server/openaiProxy.js and configure OPENAI_API_KEY.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card">
      <h2>AI Assistant</h2>
      <p>Secure architecture: Frontend → backend proxy → OpenAI API.</p>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
            <span>{message.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-controls">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question about college services..."
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button type="button" className="primary-btn" onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </section>
  );
}

export default AIAssistantPage;
