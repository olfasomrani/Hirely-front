"use client";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import useMessage from "@/hooks/useMessage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MessageToast from "./MessageToast";
import useAuth from "@/hooks/useAuth";
import FloatChatList from "./FloatChatList";
import ChatStackManager from "./ChatStackManager";
import ChatService from "@/services/chats/chats.service";
import MobileFakeChat from "../ui/MobileFakeChat";

const ChatFloatManager = () => {
  const pathname = usePathname();
  const { device, devices } = useDeviceDimension();
  if (
    !pathname.startsWith("/member") &&
    !pathname.startsWith("/adminMember")
  )
    return null;

  const {
    message,
    clearMessage,
    chatNotify,
    currentStack,
    updateCurrentStack,
    pushToStack,
    isMobileFakeChatOpen,
    onCloseMobileFakeChatOpen,
    currentReceiver,
    refreshStack,
    createFloatChatBot,
  } = useMessage();
  const { user } = useAuth();
  if (device === devices.MOBILE || device === devices.TABLET)
    return (
      isMobileFakeChatOpen && (
        <MobileFakeChat
          receiver={currentReceiver}
          onClose={onCloseMobileFakeChatOpen}
        />
      )
    );

  const [chats, setChats] = useState([]);
  useEffect(() => {
    const fetchChats = () => {
      ChatService.getAllChats()
        .then((res) => {
          setChats(
            res.data.map((c) => ({
              ...c,
              participants: c.participants.filter(
                (e) => e.idUser !== user.idUser
              ),
              isReceiver: c.lastSenderId !== user.idUser,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchChats();
    const interval = setInterval(fetchChats, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatNotify) {
      setChats((p) =>
        [...p].map((e) =>
          e.idConversation === chatNotify.idConversation
            ? {
                ...chatNotify,
                participants: chatNotify.participants.filter(
                  (e) => e.idUser !== user.idUser
                ),
              }
            : e
        )
      );
      updateCurrentStack(chatNotify);
    }
  }, [chatNotify]);

  useEffect(() => {
    if (message) {
      setChats((p) => [
        {
          ...message.chat,
          participants: message.chat.participants.filter(
            (e) => e.idUser !== user.idUser
          ),
        },
        ...p.filter((e) => e.idConversation !== message.chat.idConversation),
      ]);
      updateCurrentStack(message.chat);
    }
  }, [message]);

  useEffect(() => {
    refreshStack(chats);
  }, [chats]);
  return (
    <>
      <FloatChatList
        chats={chats}
        user={user}
        onSelectChat={pushToStack}
        createFloatChatBot={createFloatChatBot}
      />
      <ChatStackManager user={user} />
      <MessageToast
        message={message}
        clearMessage={clearMessage}
        shouldNotify={
          !currentStack.map((e) => e.key).includes(message?.chat.idConversation)
        }
        isSmallScreen={device === devices.MOBILE || device === devices.TABLET}
        user={user}
      />
    </>
  );
};

export default ChatFloatManager;
