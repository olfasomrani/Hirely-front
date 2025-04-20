import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ChatBodyViewer from "../ui/ChatBodyViewer";
import ChatInput from "../ui/ChatInput";
import { messagesDateSpliter } from "@/utils/helpers";
import useMessage from "@/hooks/useMessage";
import ChatService from "@/services/chats/chats.service";
import DisabledChatInput from "../ui/DisabledChatInput";

const FloatChatBodyViewer = ({ chat, user }) => {
    const { message, clearMessage, clearChatNotify, chatNotify } = useMessage();
    const [messages, setMessages] = useState([]);
    const chatBodyId = useId();
    const isSmooth = useRef(false);

    useEffect(() => {
        if (message) {
            if (chat.idConversation === message.chat.idConversation) {
                setMessages((p) => [...p, message.message]);
                if (message.chat.lastSenderId !== user.idUser) {
                    markAsRead(message.chat.idConversation);
                }
                isSmooth.current = true;
            }
            clearMessage();
        }
    }, [message]);

    const markAsRead = (id) => {
        ChatService.markAsRead(id)
            .then((res) => {
                setMessages((p) =>
                    [...p].map((e) => (e.idConversation === id ? res.data : e))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (chat.lastSenderId !== user.idUser) {
            markAsRead(chat.idConversation);
        }
    }, []);

    useEffect(() => {
        if (chatNotify) {
            if (chat.idConversation === chatNotify.idConversation) {
                setMessages(chatNotify.messages);
            }
            clearChatNotify();
        }
    }, [chatNotify]);

    useLayoutEffect(() => {
        if (messages.length > 0) {
            const chatBody = document.getElementById(chatBodyId);
            if (chatBody) {
                isSmooth.current
                    ? chatBody.scrollTo({
                          top: chatBody.scrollHeight,
                          behavior: "smooth",
                      })
                    : (chatBody.scrollTop = chatBody.scrollHeight);
                isSmooth.current = false;
            }
        }
    }, [messages]);

    return (
        <div className="w-full h-full grid grid-cols-1 grid-rows-[1fr_80px]">
            <ChatBodyViewer
                id={chat.idConversation}
                messages={messagesDateSpliter(messages, user.idUser)}
                setMessages={setMessages}
                chatBodyId={chatBodyId}
            />
            {chat?.participants?.[0]?.idUser ? (
                <ChatInput
                    chatId={chat.idConversation}
                    receiverId={chat?.participants?.[0]?.idUser}
                />
            ) : (
                <DisabledChatInput />
            )}
        </div>
    );
};

export default FloatChatBodyViewer;
