import ProfileImage from "@/components/ui/preview/ProfileImage";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import ChatAttachmentBlock from "./ChatAttachmentBlock";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatSentMessageDate } from "@/utils/helpers";
import MessageOptions from "./MessageOptions";

const SenderMessage = ({ message, onDelete ,isChatBot }) => {
    const [isSeenAtOpen, setIsSeenAtOpen] = useState(false);
    const {
        t,
        i18n: { language },
    } = useTranslation("main");
    return (
        <div
            className={`relative w-full grid justify-items-end ${
                message.withPhoto ? "mb-2" : ""
            }`}>
            {message.withPhoto && (
                <span className="absolute w-5 h-5 rounded-full overflow-hidden end-0 bottom-0">
                    <ProfileImage
                        src={message.sender.photo}
                        gender={message.sender.civility}
                        size={20}
                    />
                </span>
            )}
            <div className="flex">
                {!message.isDeleted && !isChatBot && (
                    <div className="cursor-pointer px-2 -translate-y-1 z-10">
                        <MessageOptions
                            id={message.idMessage}
                            onDelete={ onDelete }
                            right
                        />
                    </div>
                )}
                <pre
                    onClick={() => setIsSeenAtOpen((p) => !p)}
                    className={`text-wrap break-words whitespace-normal max-w-4/5 overflow-hidden text-xs border-[1px] ${
                        message.isDeleted
                            ? "p-2"
                            : message.attachment
                            ? "ps-2 "
                            : "py-1 px-2"
                    } text-white bg-primary border-primary rounded-[6px] !rounded-br-none me-6 pe-5 relative  font-semibold`}>
                    {message.isDeleted ? (
                        <span className="italic text-xs font-medium select-none">
                            {t("messageDeleted")}
                        </span>
                    ) : message.attachment ? (
                        <ChatAttachmentBlock message={message} />
                    ) : (
                        `${message.content}`
                    )}
                    <div className="absolute end-[2px] bottom-[6px]">
                        {message.isRead ? (
                            <MdOutlineDoneAll size={12} color="white" />
                        ) : (
                            <MdOutlineDone size={12} color="white" />
                        )}
                    </div>
                </pre>
            </div>
            {isSeenAtOpen && message.sentAt && !message.isDeleted && (
                <span className="me-7 text-xs text-textSecondary pt-1 font-medium">
                    {`${t(
                        message.readAt ? "msgSeenAt" : "msgSentAt"
                    )} ${formatSentMessageDate(
                        message.readAt || message.sentAt,
                        language
                    )}`}
                </span>
            )}
        </div>
    );
};

export default SenderMessage;
