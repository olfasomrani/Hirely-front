import useMessage from "@/hooks/useMessage";
import ChatService from "@/services/chats/chats.service";
import React, { useEffect, useId } from 'react'
import ChatBotBody from "./ChatBotBody";
import ChatInput from "../ui/ChatInput";

const ChatBotContainer = ({user}) => {
      const { chatbot, addChatBotMessage } = useMessage();
      const chatBodyId = useId();
      const onSend = (data) => {
          addChatBotMessage(data);
          ChatService.getChatBotAnswer({ message: data })
              .then((res) => {
                  addChatBotMessage(res.data.message, true);
              })
              .catch((err) => {
                  console.log(err);
              });
      };
      useEffect(() => {
          const chatBody = document.getElementById(chatBodyId);
          if (chatBody) {
              chatBody.scrollTo({
                  top: chatBody.scrollHeight,
                  behavior: "smooth",
              });
          }
      }, [chatbot]);
  return (
      <>
          <ChatBotBody user={user} containerId={chatBodyId} />
          <ChatInput onSend={onSend} chatBot />
      </>
  );
}

export default ChatBotContainer
