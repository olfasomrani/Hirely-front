import { formatSentMessageDate, messagesDateSpliter } from "@/utils/helpers";
import React from "react";
import MessageContent from "../ui/MessageContent";
import { useTranslation } from "react-i18next";
import useMessage from "@/hooks/useMessage";

const ChatBotBody = ({ user ,containerId}) => {
    const { i18n } = useTranslation();
    const { chatbot } = useMessage();
    
    return (
        <div className="overflow-y-auto no-scroll-y p-3" id={containerId}>
            {Object.entries(
                messagesDateSpliter(chatbot.messages, user.idUser)
            ).map(([k, v]) => {
                return (
                    <div key={k} className="flex flex-col gap-y-1">
                        <div className="w-full text-center text-[10px] text-textSecondary">
                            {formatSentMessageDate(k, i18n.language)}
                        </div>
                        {v.map((m, i) => (
                            <MessageContent message={m} key={`${k}-${i}`} isChatBot/>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatBotBody;
