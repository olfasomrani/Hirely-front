"use client";
import ChatService from "@/services/chats/chats.service";
import { useEffect } from "react";
import MessageMapper from "./MessageMapper";

const ChatBodyViewer = ({
    id,
    messages,
    setMessages,
    chatBodyId,
    blockScroll,
}) => {
    
    useEffect(() => {
        ChatService.getOneChat(id)
            .then((res) => {
                setMessages(res.data.messages);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onDelete = (message) => {
        blockScroll.current = true;
        setMessages((p) => {
            return [...p].map((e) =>
                e.idMessage === message.idMessage ? { ...message } : { ...e }
            );
        });
    };

    return (
        <MessageMapper
            messages={messages}
            chatBodyId={chatBodyId}
            onDelete={onDelete}
        />
    );
};

export default ChatBodyViewer;
