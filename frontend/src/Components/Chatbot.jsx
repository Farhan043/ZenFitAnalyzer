
import React, { useState } from "react";
import axios from "axios";
import { IoChatbubbleEllipsesOutline, IoClose, IoTrash } from "react-icons/io5";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "http://localhost:4000/chatbot/chat",
        { message: input },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setMessages([...newMessages, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  // Delete message
  const deleteMessage = (index) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chatbot Button */}
      <button
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoChatbubbleEllipsesOutline className="text-2xl" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white shadow-xl rounded-lg border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="bg-green-500 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h2 className="text-sm">Welcome <span className="text-lg font-bold text-black">ZenFitAnalyzer</span></h2>
            <button onClick={() => setIsOpen(false)}>
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Chat Box */}
          <div className="p-3 h-64 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`relative p-3 rounded-lg text-sm max-w-xs shadow-md ${
                  msg.role === "user" ? "bg-green-200 self-end" : "bg-gray-200 self-start"
                }`}
              >
                <span className="font-semibold text-gray-800">{msg.role === "user" ? "You" : "Bot"}:</span> <span className="text-gray-600">{msg.content}</span>
                <div className="absolute top-0 right-1">
                  <button onClick={() => deleteMessage(index)} className="text-gray-500 hover:text-red-500">
                    <IoTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="border-t border-gray-300 p-3 flex items-center bg-gray-100 rounded-b-lg">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none bg-white"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;



