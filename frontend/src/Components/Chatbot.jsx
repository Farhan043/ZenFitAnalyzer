import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend, IoTrash } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm your ZenFit Assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen]);

  // Send message
  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/chatbot/chat",
        { message: input },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setIsTyping(false);
      setMessages([...newMessages, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      setIsTyping(false);
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    }
  };

  // Delete message
  const deleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {/* Chatbot Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoChatbubbleEllipsesOutline className="text-2xl" />
        </motion.button>

        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-0 sm:right-5 w-full sm:w-[400px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden backdrop-blur-lg bg-opacity-95 mx-2 sm:mx-0"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
                </div>
                <h2 className="text-lg font-semibold">ZenFit Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white h-[50vh] sm:h-[60vh]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#CBD5E0 #EDF2F7'
              }}
            >
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[85%] p-4 rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className={`text-sm ${msg.role === "user" ? "text-white" : "text-gray-800"}`}>
                        {msg.content}
                      </p>
                      <span className="absolute bottom-1 right-2 text-xs opacity-70">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => deleteMessage(index)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <IoTrash size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim()}
                  className={`p-3 ${
                    input.trim() 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600' 
                      : 'bg-gray-300'
                  } text-white rounded-full hover:shadow-lg transition-all duration-300`}
                >
                  <IoSend className="text-xl" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;



