import ChatBotContainer from "../chatBot/ChatBotContainer";
import ChatBodyViewer from "../ui/ChatBodyViewer";
import ChatHeader from "../ui/ChatHeader";
import ChatInput from "../ui/ChatInput";
import ChatBotHeader from "../chatBot/ChatBotHeader";
import DisabledChatInput from "../ui/DisabledChatInput";

const ChatBody = ({
    chatId,
    messages,
    setMessages,
    height,
    receiver,
    chatBodyId,
    openAboutModal,
    isMobile,
    user,
    blockScroll,
}) => {
    return chatId ? (
        <div
            className="w-full grid grid-cols-1 grid-rows-[88px_1fr_80px]"
            style={{ height }}>
            <ChatHeader
                receiver={receiver}
                openAboutModal={openAboutModal}
                isMobile={isMobile}
            />
            <ChatBodyViewer
                id={chatId}
                messages={messages}
                setMessages={setMessages}
                chatBodyId={chatBodyId}
                blockScroll={blockScroll}
            />
            {receiver.idUser !== "deletedUser" ? (
                <ChatInput chatId={chatId} receiverId={receiver.idUser} />
            ) : (
                <DisabledChatInput />
            )}
        </div>
    ) : (
        <div
            className="w-full grid grid-cols-1 grid-rows-[88px_1fr]"
            style={{ height }}>
            <ChatBotHeader
                isMobile={isMobile}
                openAboutModal={openAboutModal}
            />
            <ChatBotContainer user={user} />
        </div>
    );
};

export default ChatBody;
