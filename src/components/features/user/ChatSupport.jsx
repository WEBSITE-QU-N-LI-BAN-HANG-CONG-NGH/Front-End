"use client";
import React, { useState } from "react";

const ChatSupport = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col rounded-lg w-[300px] max-md:w-full">
      <header className="p-4 font-semibold text-gray-900 border-b border-solid">
        Hỗ Trợ Khách Hàng
      </header>

      <main className="flex-1 p-4 min-h-[200px]">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full" />
          <div className="flex-1">
            <div className="p-3 text-sm text-gray-700 bg-gray-100 rounded-xl">
              <p>Xin chào! Tôi là trợ lý Tech Shop.</p>
              <p>Tôi có thể giúp gì cho bạn về khiếu nại hôm nay?</p>
            </div>
            <time className="mt-1 text-xs text-gray-500">04:32 PM</time>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-solid">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 p-2 text-sm rounded-md border border-solid"
          />
          <button
            type="submit"
            className="flex justify-center items-center w-9 h-9 bg-blue-600 rounded-md cursor-pointer border-none text-white hover:bg-blue-700 transition-colors"
          >
            <i className="ti ti-send" />
          </button>
        </form>
      </footer>

      <p className="p-4 text-xs text-center text-gray-500 border-t border-solid">
        Chatbot này có thể giúp đỡ với các câu hỏi cơ bản. Đối với các vấn đề
        phức tạp, vui lòng gửi biểu mẫu khiếu nại.
      </p>
    </div>
  );
};

export default ChatSupport;
