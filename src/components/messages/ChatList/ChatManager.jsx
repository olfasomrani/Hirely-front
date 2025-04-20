"use client";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import useMessage from "@/hooks/useMessage";
import ChatList from "./ChatList";
import ChatBody from "./ChatBody";
import {
    use,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import ChatAboutModal from "./ChatAboutModal";
import ChatAbout from "./ChatAbout";
import ChatService from "@/services/chats/chats.service";
import useAuth from "@/hooks/useAuth";
import { messagesDateSpliter } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import ChatBotAboutModal from "../chatBot/ChatBotAboutModal";
import ChatBotAbout from "../chatBot/ChatBotAbout";
import getDisabledUserData from "@/utils/data/deletedUser";
import { useTranslation } from "react-i18next";

const ChatManager = () => {
    const { message, clearMessage, clearChatNotify, chatNotify } = useMessage();
    const { device, devices, devicePicker, height } = useDeviceDimension();
    const [aboutModal, setAboutModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState({});
    const [chats, setChats] = useState([]);
    const { user } = useAuth();
    const chatBodyId = useId();
    const isSmooth = useRef(false);
    const blockScroll = useRef(false);
    const searchParams = useSearchParams();
    const [isChatNavigated, setIsChatNavigated] = useState(false);
    const chatId = searchParams.get("chatId");

    useLayoutEffect(() => {
        if (message) {
            setChats((p) => [
                {
                    ...message.chat,
                    participants: message.chat.participants.filter(
                        (e) => e.idUser !== user.idUser
                    ),
                },
                ...p.filter(
                    (e) => e.idConversation !== message.chat.idConversation
                ),
            ]);
            if (currentChatId.idConversation === message.chat.idConversation) {
                setMessages((p) => [...p, message.message]);
                if (message.chat.lastSenderId !== user.idUser) {
                    markAsRead(message.chat.idConversation);
                }
                isSmooth.current = true;
            }
            clearMessage();
        }
    }, [message]);

    useLayoutEffect(() => {
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
            if (currentChatId.idConversation === chatNotify.idConversation) {
                setMessages(chatNotify.messages);
            }
            clearChatNotify();
        }
    }, [chatNotify]);

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

    useLayoutEffect(() => {
        if (messages.length > 0 && !blockScroll.current) {
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
        blockScroll.current = false;
    }, [messages]);

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
        if (
            !isChatNavigated &&
            chats &&
            chats.find((e) => e.idConversation == +chatId)
        ) {
            handleSelectChat(chats.find((e) => e.idConversation == chatId));
            setIsChatNavigated(true);
        }
        if (currentChatId.idConversation)
            setCurrentChatId(
                chats.find(
                    (e) => e.idConversation === currentChatId.idConversation
                )
            );
    }, [chats]);

    const handleSelectChat = (chat) => {
        setCurrentChatId(chat);
        if (!chat.idConversation) return;
        if (chat.lastSenderId !== user.idUser) {
            markAsRead(chat.idConversation);
        }
    };

    const { i18n } = useTranslation();
    const receiverUser =
        currentChatId?.participants?.[0] && currentChatId.participants?.[0]?.isActive
            ? currentChatId.participants?.[0]
            : getDisabledUserData(i18n.language);

    return (
        <div
            className="grid grid-cols-[70px_1fr] tablet:grid-cols-[320px_1fr] desktop:grid-cols-[auto_2fr_1fr] w-screen max-w-[1600px] mx-auto"
            style={{ height: `${height - 64}px` }}>
            <ChatList
                chats={chats}
                user={user}
                currentChatId={currentChatId.idConversation}
                onSelectChat={handleSelectChat}
            />
            <ChatBody
                chatId={currentChatId.idConversation}
                messages={messagesDateSpliter(messages, user.idUser)}
                setMessages={setMessages}
                height={`${height - 64}px`}
                receiver={receiverUser}
                chatBodyId={chatBodyId}
                blockScroll={blockScroll}
                openAboutModal={() => setAboutModal(true)}
                isMobile={
                    device === devices.MOBILE || device === devices.TABLET
                }
                user={user}
            />
            {devicePicker(
                {
                    [devices.MOBILE]: currentChatId?.idConversation ? (
                        <ChatAboutModal
                            user={receiverUser}
                            onClose={() => setAboutModal(false)}
                            isOpen={aboutModal}
                        />
                    ) : (
                        <ChatBotAboutModal
                            onClose={() => setAboutModal(false)}
                            isOpen={aboutModal}
                        />
                    ),
                    [devices.TABLET]: currentChatId?.idConversation ? (
                        <ChatAboutModal
                            user={receiverUser}
                            onClose={() => setAboutModal(false)}
                            isOpen={aboutModal}
                        />
                    ) : (
                        <ChatBotAboutModal
                            onClose={() => setAboutModal(false)}
                            isOpen={aboutModal}
                        />
                    ),
                    [devices.DESKTOP]: currentChatId?.idConversation ? (
                        <ChatAbout user={receiverUser} />
                    ) : (
                        <ChatBotAbout />
                    ),
                    [devices.TV]: currentChatId?.idConversation ? (
                        <ChatAbout user={receiverUser} />
                    ) : (
                        <ChatBotAbout />
                    ),
                },
                null
            )}
        </div>
    );
};

export default ChatManager;
