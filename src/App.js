import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

const App = () => {
  const initialMessage = { text: 'Hi! How can I help you today?', isBot: true };
  const initialSuggestions = [
    { label: 'Product Information', value: 'product information' },
    { label: 'Contact Information', value: 'contact information' },
  ];

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [dynamicSuggestions, setDynamicSuggestions] = useState([]);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDynamicSuggestions(initialSuggestions);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages((prevMessages) => [...prevMessages, { text: input, isBot: false }]);
    setInput('');

    setIsTyping(true);
    setShowSuggestions(false); // Hide suggestions immediately after submitting
    setTimeout(() => {
      handleBotResponse(input.toLowerCase());
    }, 1000);
  };

  const handleBotResponse = (inputText) => {
    let response = '';
    let newSuggestions = [];

    switch (inputText) {
      case 'hello':
      case 'hi':
        response = 'Hello! How can I assist you today?';
        newSuggestions = initialSuggestions;
        break;
      case 'product information':
        response = 'Sure, which product would you like information about?';
        newSuggestions = [
          { label: 'Laptop', value: 'laptop' },
          { label: 'Smartphone', value: 'smartphone' },
        ];
        break;
      case 'laptop':
        response = 'Great! What specific details do you want to know about laptops?';
        newSuggestions = [
          { label: 'Price', value: 'price' },
          { label: 'Model', value: 'model' },
        ];
        break;
      case 'price':
        response = 'Our pricing varies based on the product. We have offers. Select an offer.';
        newSuggestions = [
          { label: '50%', value: '50%' },
          { label: '60%', value: '60%' },
        ];
        break;
      case '50%':
        response = '50% offer applied';
        newSuggestions = [
          { label: 'Anything else', value: 'anything else' },
          { label: 'End Chat', value: 'end chat' },
        ];
        break;
      case 'contact information':
        response = 'Email id - vamsee@gmail.com';
        newSuggestions = [
          { label: 'Anything else', value: 'anything else' },
          { label: 'End Chat', value: 'end chat' },
        ];
        break;
      case 'end chat':
        response = 'Bye';
        newSuggestions = [{ label: 'New Chat', value: 'new chat' }];
        break;
      case 'new chat':
        setMessages([initialMessage]);
        newSuggestions = initialSuggestions;
        setShowSuggestions(true);
        response = initialMessage.text;
        break;
      default:
        response = "I apologize; that was not clear to me. Use the suggestions, please.";
        newSuggestions = dynamicSuggestions;
        break;
    }

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: response, isBot: true }]);
      setDynamicSuggestions(newSuggestions);
      setShowSuggestions(true);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessages((prevMessages) => [...prevMessages, { text: suggestion, isBot: false }]);
    setIsTyping(true);
    setShowSuggestions(false); // Hide suggestions immediately after clicking
    setTimeout(() => {
      handleBotResponse(suggestion.toLowerCase());
    }, 1000);
  };

  return (
    <div className="app-container">
      {!chatbotVisible && (
        <button className="toggle-chatbot" onClick={() => setChatbotVisible(true)}>
          Chatbot
        </button>
      )}
      <div className={`support-chat-container ${chatbotVisible ? 'visible' : 'hidden'}`}>
        <div className="support-chat">
          <p onClick={() => setChatbotVisible(!chatbotVisible)} className='closebtn'>Close</p>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.isBot ? 'bot-message' : 'user-message'}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="bot-message typing">Bot is typing...</div>}
          </div>
          {showSuggestions && (
            <div className="suggestion-buttons">
              {dynamicSuggestions.map((button, index) => (
                <button key={index} onClick={() => handleSuggestionClick(button.value)}>
                  {button.label}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
