import React, { useState, useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

function createClickableLinks(text) {
  if (typeof text !== "string") return text;
  const urlRegex = /(https?:\/\/[^\s)]+)/g;

  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function ChatBot() {
  const [msg, addMessage] = useState([]);
  const chatContainerRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [msg]);

  const sendMessageToAPI = async (message) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`,
        {
          message,
        }
      );
      return response.data.message;
    } catch (error) {
      console.error("Failed to send message:", error);
      return "An error occurred. Please try again later.";
    }
  };
  

  const handlesendNewMessage = async () => {
    if (!newMsg.trim()) return;

    addMessage((prev) => [...prev, { id: 0, msg: newMsg }]);
    setNewMsg("");

    const botResponse = await sendMessageToAPI(newMsg);
    addMessage((prev) => [...prev, { id: 1, msg: botResponse }]);
  };

  const handleInputChange = (event) => {
    setNewMsg(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlesendNewMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-7 z-50">
      {isOpened ? (
        <div className="fixed bottom-[390px] right-7 z-50">
        <div className="w-80 bg-white shadow-lg flex flex-col rounded-lg">
          <div className="flex items-center justify-between p-4 bg-white border-b">
            <div className="flex items-center">
              <div className="p-1 rounded-full bg-primary">
                <img
                  src={"/images/logo/logoChatBot.png"}
                  alt="chatBot Logo"
                  className="w-10 h-10 rounded-full bg-primary"
                />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800">CMDABot</p>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <CloseOutlined
              className="text-gray-600 cursor-pointer"
              onClick={() => setIsOpened(false)}
            />
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 max-h-80"
          >
            {msg.map((message, index) => (
              <div
                key={index}
                className={`text-sm ${
                  message.id === 0 ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${
                    message.id === 0
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {createClickableLinks(message.msg)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center p-1 border-t bg-gray-50">
            <textarea
              placeholder="Tapez votre message ici..."
              className="flex-1 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMsg}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handlesendNewMessage}
              className="ml-2 p-1 bg-primary text-white rounded-lg"
            >
              <SendOutlined style={{ fontSize: "20px", color: "white" }} />
            </button>
          </div>
        </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="p-2 rounded-full bg-primary"
        >
          <img
            src={"/images/logo/logoChatBot.png"}
            alt="Open Chat"
            className="w-12 h-12 rounded-full"
          />
        </button>
      )}
    </div>
  );
}

export default ChatBot;