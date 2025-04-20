"use client";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import ChatItem from "./ChatItem";
import ChatBotItem from "../chatBot/ChatBotItem";

const ChatList = ({ chats, currentChatId, onSelectChat, user }) => {
    const { device, devices } = useDeviceDimension();

    return (
        <div
            className={`!h-full overflow-y-auto no-scroll-y flex flex-col bg-secondary py-3  gap-y-1 ${
                device === devices.MOBILE ? "w-[70px]" : "w-[320px]"
            }`}>
            <ChatBotItem
                isCurrent={!currentChatId}
                user={user}
                onClick={() => onSelectChat({})}
                isMobile={device === devices.MOBILE}
            />
            {chats.map((c) => (
                <ChatItem
                    isMobile={device === devices.MOBILE}
                    chat={c}
                    user={user}
                    isCurrent={c.idConversation === currentChatId}
                    onClick={onSelectChat}
                    key={c.idConversation}
                />
            ))}
        </div>
    );
};

export default ChatList;
