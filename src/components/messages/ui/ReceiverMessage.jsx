import ProfileImage from "@/components/ui/preview/ProfileImage";
import ChatAttachmentBlock from "./ChatAttachmentBlock";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatMessage, formatSentMessageDate } from "@/utils/helpers";
import MessageOptions from "./MessageOptions";
import getDisabledUserData from "@/utils/data/deletedUser";

const ReceiverMessage = ({ message, onDelete, isChatBot }) => {
    const [isSeenAtOpen, setIsSeenAtOpen] = useState(false);
    const {
        t,
        i18n: { language },
    } = useTranslation("main");
    const receiverUser =
        message.sender && message.sender?.isActive
            ? message.sender
            : getDisabledUserData(language);
    return (
        <div className={`relative pe-6 ${message.withPhoto ? "mb-2" : ""}`}>
            {message.withPhoto && (
                <span className="absolute w-5 h-5 rounded-full overflow-hidden start-0 bottom-0">
                    <ProfileImage
                        src={receiverUser.photo}
                        gender={receiverUser.civility}
                        size={20}
                    />
                </span>
            )}
            {!message.isDeleted && !isChatBot && (
                <div className="absolute end-0 -top-1 cursor-pointer">
                    <MessageOptions
                        id={message.idMessage}
                        onDelete={onDelete}
                    />
                </div>
            )}
            <pre
                className={`text-wrap break-words whitespace-normal max-w-[80%] grid text-xs border-[1px] relative font-semibold ${
                    message.isDeleted
                        ? "p-2"
                        : message.attachment
                        ? "p-0"
                        : "py-1 px-2"
                } border-textSecondary text-textSecondary grid bg-white rounded-[5px] !rounded-bl-none ms-6`}
                onClick={() => setIsSeenAtOpen((p) => !p)}>
                {message.isDeleted ? (
                    <span className="italic text-xs font-medium select-none">
                        {t("messageDeleted")}
                    </span>
                ) : message.attachment ? (
                    <ChatAttachmentBlock message={message} isReceiver />
                ) : (
                    <div
                        className="break-words w-full"
                        dangerouslySetInnerHTML={{
                            __html: formatMessage(message.content),
                        }}
                    />
                )}
            </pre>

            {isSeenAtOpen && message.sentAt && !message.isDeleted && (
                <span className="ms-7 text-xs text-textSecondary pt-1 font-medium">
                    {`${t("msgSeenAt")} ${formatSentMessageDate(
                        message.readAt || message.sentAt,
                        language
                    )}`}
                </span>
            )}
        </div>
    );
};

export default ReceiverMessage;
