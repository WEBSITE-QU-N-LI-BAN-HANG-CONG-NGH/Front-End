import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "Xin chào! Tôi là trợ lý Tech Shop AI. Tôi có thể giúp gì cho bạn?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    const storedMessages = Cookies.get('tech_shop_gemini_chat_history'); 
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) { // Đảm bảo là mảng và không rỗng
            setMessages(parsedMessages);
        } else {
             // Nếu dữ liệu lưu trữ không hợp lệ, reset về trạng thái ban đầu
            setMessages([ { sender: "bot", content: "Xin chào! Tôi là trợ lý Tech Shop AI. Tôi có thể giúp gì cho bạn?" }]);
        }
      } catch (error) {
        console.error("Lỗi phân tích lịch sử chat đã lưu:", error);
        // Reset về trạng thái ban đầu nếu có lỗi
        setMessages([ { sender: "bot", content: "Xin chào! Tôi là trợ lý Tech Shop AI. Tôi có thể giúp gì cho bạn?" }]);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 || (messages.length === 1 && messages[0].sender !== "bot")) { // Lưu cả khi tin nhắn đầu tiên là của user
      Cookies.set('tech_shop_gemini_chat_history', JSON.stringify(messages), { expires: 7 });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]); // Thêm isOpen để cuộn khi mở chatbox

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return; // Không gửi nếu đang typing hoặc input rỗng

    const userMessage = { sender: "user", content: inputValue };
    // Cập nhật messages ngay lập tức với tin nhắn của người dùng
    const currentMessagesWithUser = [...messages, userMessage];
    setMessages(currentMessagesWithUser);
    const messageToSendToBackend = inputValue; // Lưu lại inputValue vì nó sẽ bị xóa
    setInputValue("");
    setIsTyping(true);

    try {
      // URL của backend Flask. Thay đổi nếu bạn deploy ở đâu đó khác.
      const backendUrl = import.meta.env.VITE_CHATBOT_BACKEND_URL || "http://localhost:5006/api/chat";
      
      const response = await fetch(backendUrl, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageToSendToBackend, // Sử dụng giá trị đã lưu
          // Gửi một số lượng giới hạn tin nhắn gần nhất làm lịch sử
          // Lọc bỏ tin nhắn chào mừng ban đầu của bot nếu không cần thiết cho context
          history: currentMessagesWithUser.slice(Math.max(0, currentMessagesWithUser.length - 9), -1) // Gửi lịch sử TRƯỚC tin nhắn hiện tại của user
                                        .filter(
                                            (msg, index, arr) => !(msg.sender === "bot" && msg.content.includes("Tôi là trợ lý Tech Shop AI") && index === 0 && arr.length > 1)
                                        ) 
        })
      });

      setIsTyping(false); 

      if (!response.ok) {
        let errorText = "Xin lỗi, có lỗi xảy ra từ phía máy chủ.";
        try {
            const errorData = await response.json();
            // Backend Flask có thể trả về mảng lỗi dạng [{"text": "thông báo lỗi"}]
            if (Array.isArray(errorData) && errorData.length > 0 && errorData[0].text) {
                errorText = errorData[0].text;
            } else if (errorData.error) { // Hoặc dạng {"error": "thông báo lỗi"}
                errorText = errorData.error;
            }
        } catch (e) {
            // Nếu không parse được JSON, dùng status text
            errorText = response.statusText || errorText;
        }
        console.error("Lỗi từ server Gemini Chatbot:", response.status, errorText);
        setMessages(prevMessages => [
          ...prevMessages, 
          { sender: "bot", content: errorText }
        ]);
        return;
      }

      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        data.forEach(msg => {
          if (msg.text) {
            // Markdown cơ bản: **bold** -> <strong>bold</strong>, *italic* -> <em>italic</em>
            // \n -> <br>
            let formattedText = msg.text
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/\n/g, "<br />");

            setMessages(prevMessages => [
              ...prevMessages, 
              { sender: "bot", content: formattedText, isHTML: true }
            ]);
          }
          // Nếu Gemini API trả về ảnh (ít phổ biến cho model text thuần túy nhưng có thể cấu hình)
          if (msg.image) {
            setMessages(prevMessages => [
              ...prevMessages, 
              { sender: "bot", image: msg.image }
            ]);
          }
        });
      } else {
        setMessages(prevMessages => [
          ...prevMessages, 
          { sender: "bot", content: "Xin lỗi, tôi không nhận được phản hồi rõ ràng. Bạn có thể thử lại không?" }
        ]);
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn đến backend Gemini:", error);
      setIsTyping(false);
      setMessages(prevMessages => [
        ...prevMessages, 
        { sender: "bot", content: "Xin lỗi, có lỗi xảy ra khi kết nối đến hệ thống hỗ trợ. Vui lòng thử lại sau." }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) { 
      e.preventDefault(); // Ngăn hành động mặc định của Enter (ví dụ submit form nếu có)
      sendMessage();
    }
  };

  const clearChatHistory = () => {
    Cookies.remove('tech_shop_gemini_chat_history');
    setMessages([
      { sender: "bot", content: "Xin chào! Tôi là trợ lý Tech Shop AI. Tôi có thể giúp gì cho bạn?" }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans"> {/* Thêm font-sans */}
      {/* Chat toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat interface */}
      {isOpen && (
        <div 
            className="absolute bottom-[calc(3.5rem+1rem)] right-0 w-full max-w-sm sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-300 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbox-header"
        >
          {/* Chat header */}
          <div id="chatbox-header" className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="font-medium text-sm sm:text-base">Tech Shop Trợ Lý AI</h3>
              <p className="text-xs opacity-80">Hỗ trợ bởi Gemini</p>
            </div>
            <button 
              onClick={clearChatHistory}
              className="bg-blue-700 hover:bg-blue-800 text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
              title="Xóa lịch sử trò chuyện"
            >
              Xóa lịch sử
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 sm:mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a8.001 8.001 0 00-14.856 0M12 21v-4M4.572 8.572a8.001 8.001 0 0014.856 0M12 3v4M3 12h4M17 12h4M6.857 6.857L9 9m6-2.143l2.143-2.143M6.857 17.143L9 15m6 2.143l2.143 2.143" />
                    </svg>
                  </div>
                )}

                <div 
                  className={`p-2 sm:p-3 rounded-lg max-w-[80%] break-words text-sm sm:text-base ${ 
                    message.sender === "user" 
                      ? "bg-blue-500 text-white rounded-br-none" 
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : message.content ? (
                    <p>{message.content}</p>
                  ) : null}

                  {message.image && (
                    <img src={message.image} alt="Hình ảnh từ bot" className="mt-2 rounded-md max-w-full h-auto" />
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 flex-shrink-0 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a8.001 8.001 0 00-14.856 0M12 21v-4M4.572 8.572a8.001 8.001 0 0014.856 0M12 3v4M3 12h4M17 12h4M6.857 6.857L9 9m6-2.143l2.143-2.143M6.857 17.143L9 15m6 2.143l2.143 2.143" />
                   </svg>
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "100ms" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-gray-200 p-3 sm:p-4 flex flex-shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isTyping} 
              aria-label="Chat input"
            />
            <button 
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 sm:px-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTyping || !inputValue.trim()} 
              aria-label="Gửi tin nhắn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;