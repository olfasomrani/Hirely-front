import useAuth from "@/hooks/useAuth";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import useSocket from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const MessageContext = createContext({
    message: null,
    clearMessage: () => {},
    chatNotify: null,
    clearChatNotify: () => {},
    currentStack: [],
    setCurrentStack: (_stack) => {},
    setIsChatListOpen: (_key, _status) => {},
    removeFromStack: (_stack) => {},
    pushToStack: (_stack) => {},
    updateCurrentStack: (_stack) => {},
    pushFakeChatToStack: (_stack) => {},
    removeFakeChat: () => {},
    createFakeChat: (_receiver) => {},
    isMobileFakeChatOpen: false,
    currentReceiver: null,
    onCloseMobileFakeChatOpen: () => {},
    handleChatNavigate: (_id) => {},
});

const MessageProvider = ({ children }) => {
    const { connectedSocket } = useSocket();
    const { user } = useAuth();
    const [message, setMessage] = useState(null);
    const [chatNotify, setChatNotify] = useState(null);
    const [currentStack, setCurrentStack] = useState([]);
    const [currentReceiver, setCurrentReceiver] = useState(null);
    const [isMobileFakeChatOpen, setIsMobileFakeChatOpen] = useState(false);
    const { device, devices } = useDeviceDimension();

    const isMobile = device === devices.MOBILE || device === devices.TABLET;

    const onCloseMobileFakeChatOpen = () => {
        setCurrentReceiver(null);
        setIsMobileFakeChatOpen(false);
    };

    const setFakeChatModal = (receiver) => {
        setCurrentReceiver(receiver);
        setIsMobileFakeChatOpen(true);
    };

    const navigation = useRouter();

    const handleChatNavigate = (id) => {
        navigation.push(`/member/messaging?chatId=${id}`);
        onCloseMobileFakeChatOpen();
    };

    const handleMessage = (data) => {
        setMessage({
            message: data.message,
            chat: {
                ...data.chat,
                participants: data.chat.participants.filter(
                    (e) => e.idUser !== user.idUser
                ),
            },
        });
    };

    const handleChatNotify = (data) => {
        setChatNotify(data);
    };

    const clearMessage = useCallback(() => setMessage(null), []);
    const clearChatNotify = useCallback(() => setChatNotify(null), []);

    useEffect(() => {
        if (!connectedSocket?.hasListeners("chat-message")) {
            connectedSocket?.on("chat-message", handleMessage);
        }
        if (!connectedSocket?.hasListeners("chat-read")) {
            connectedSocket?.on("chat-read", handleChatNotify);
        }

        return () => {
            connectedSocket?.off("chat-message", handleMessage);
            connectedSocket?.off("chat-read", handleChatNotify);
        };
    }, [connectedSocket]);

    const pushToStack = (chat) => {
        if (isMobile) {
            handleChatNavigate(chat.idConversation);
        }
        const newStack = [
            {
                key: chat.idConversation,
                isChatListOpen: true,
                stack: {
                    ...chat,
                    participants: chat.participants.filter(
                        (e) => e.idUser !== user.idUser
                    ),
                },
            },
            ...currentStack.filter((e) => e.key !== chat.idConversation),
        ];

        if (newStack.length <= 2) {
            setCurrentStack(newStack);
            return;
        }
        setCurrentStack(newStack.slice(0, 2));
    };

    const pushFakeChatToStack = (chat) => {
        setCurrentStack((p) =>
            [...p].map((e) =>
                e.key === "fake-chat"
                    ? {
                          key: chat.idConversation,
                          isChatListOpen: true,
                          stack: {
                              ...chat,
                              participants: chat.participants.filter(
                                  (e) => e.idUser !== user.idUser
                              ),
                          },
                      }
                    : { ...e }
            )
        );
    };

    const removeFakeChat = () => {
        removeFromStack("fake-chat");
        onCloseMobileFakeChatOpen();
    };

    const createFakeChat = (receiver) => {
        if (isMobile) {
            setFakeChatModal(receiver);
        }
        const newStack = [
            {
                key: "fake-chat",
                isChatListOpen: true,
                stack: receiver,
                isFake: true,
            },
            ...currentStack,
        ];

        if (newStack.length <= 2) {
            setCurrentStack(newStack);
            return;
        }
        setCurrentStack(newStack.slice(0, 2));
    };

    const removeFromStack = (key) => {
        setCurrentStack((p) => [...p].filter((e) => e.key !== key));
    };

    const setIsChatListOpen = (key, isChatListOpen) => {
        setCurrentStack((p) =>
            [...p].map((e) => (e.key === key ? { ...e, isChatListOpen } : e))
        );
    };

    const updateCurrentStack = (chat) => {
        setCurrentStack((p) =>
            [...p].map((e) =>
                e.key === chat.idConversation
                    ? {
                          ...e,
                          stack: {
                              ...chat,
                              participants: chat.participants.filter(
                                  (e) => e.idUser !== user.idUser
                              ),
                          },
                      }
                    : { ...e }
            )
        );
    };

    return (
        <MessageContext.Provider
            value={{
                message,
                clearMessage,
                chatNotify,
                clearChatNotify,
                currentStack,
                setCurrentStack,
                setIsChatListOpen,
                removeFromStack,
                pushToStack,
                updateCurrentStack,
                pushFakeChatToStack,
                removeFakeChat,
                createFakeChat,
                isMobileFakeChatOpen,
                onCloseMobileFakeChatOpen,
                currentReceiver,
                handleChatNavigate,
            }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;
