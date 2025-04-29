import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "Xin chào! Tôi là trợ lý Tech Shop. Tôi có thể giúp gì cho bạn?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { sender: "user", content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Gửi tin nhắn đến Rasa Server (port 5005)
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", message: inputValue })
      });

      const data = await response.json();
      setIsTyping(false);

      // Process responses from Rasa
      if (data && data.length > 0) {
        data.forEach(msg => {
          // Handle text responses
          if (msg.text) {
            // Convert markdown-style bold to HTML
            const formattedText = msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            setMessages(prevMessages => [
              ...prevMessages, 
              { sender: "bot", content: formattedText, isHTML: true }
            ]);
          }
          
          // Handle image responses if any
          if (msg.image) {
            setMessages(prevMessages => [
              ...prevMessages, 
              { sender: "bot", image: msg.image }
            ]);
          }
        });
      } else {
        // Fallback if no response
        setMessages(prevMessages => [
          ...prevMessages, 
          { sender: "bot", content: "Xin lỗi, tôi không hiểu ý bạn. Bạn có thể diễn đạt lại được không?" }
        ]);
      }
    } catch (error) {
      console.error("Error sending message to Rasa:", error);
      setIsTyping(false);
      setMessages(prevMessages => [
        ...prevMessages, 
        { sender: "bot", content: "Xin lỗi, có lỗi xảy ra khi kết nối đến hệ thống hỗ trợ. Vui lòng thử lại sau." }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat interface */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-300">
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-medium">Tech Shop Trợ Lý Ảo</h3>
            <p className="text-xs opacity-80">Hỗ trợ trực tuyến 24/7</p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                )}

                <div 
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.sender === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : message.content ? (
                    <p>{message.content}</p>
                  ) : null}

                  {message.image && (
                    <img src={message.image} alt="Bot response" className="mt-2 rounded-md" />
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-white text-sm">U</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "100ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-300 rounded-l-lg p-2 outline-none focus:border-blue-500"
            />
            <button 
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;