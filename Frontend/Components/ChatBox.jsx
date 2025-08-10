import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial "hi" message
  useEffect(() => {
    setMessages([{ text: 'Hi! How can I assist you with HR today?', sender: 'user' }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSend = async () => {
  if (!input.trim()) return;

  setMessages(prev => [...prev, { text: input, sender: 'user' }]);
  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input })  // must be "query"
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
  } catch (error) {
    setMessages(prev => [...prev, { text: "⚠️ Error: Could not send message.", sender: 'bot' }]);
  } finally {
    setLoading(false);
    setInput("");
  }
};
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className='main-container'>
      <div className="container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="Chatarea">
        <input 
          type="text" 
          id="chat-input" 
          placeholder='Chat with HR Bot'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
