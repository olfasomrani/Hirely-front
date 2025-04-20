"use client";
import { useTranslation } from "react-i18next";
import MessageContent from "./MessageContent";
import { formatSentMessageDate } from "@/utils/helpers";

const MessageMapper = ({ messages, chatBodyId, onDelete }) => {
    const { i18n } = useTranslation();
    return (
        <div className="overflow-y-auto no-scroll-y p-3" id={chatBodyId}>
            {Object.entries(messages).map(([k, v]) => {
                return (
                    <div key={k} className="flex flex-col gap-y-2">
                        <div className="w-full text-center text-[10px] text-textSecondary">
                            {formatSentMessageDate(k, i18n.language)}
                        </div>
                        {v.map((m) => (
                            <MessageContent
                                message={m}
                                key={m.idMessage}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default MessageMapper;
