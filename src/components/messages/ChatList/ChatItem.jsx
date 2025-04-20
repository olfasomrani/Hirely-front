"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatChatDate } from "@/utils/helpers";
import ProfileImage from "@/components/ui/preview/ProfileImage";
import getDisabledUserData from "@/utils/data/deletedUser";

const ChatItem = ({ chat, isMobile, user, isCurrent, onClick }) => {
    const { t, i18n } = useTranslation("main");

    const receiverUser =
        chat.participants?.[0] && chat.participants?.[0]?.isActive
            ? chat.participants?.[0]
            : getDisabledUserData(i18n.language);
    return (
        <div
            className={`w-full relative cursor-pointer  ${
                isCurrent ? "bg-white shadow" : "bg-secondary"
            } ${isMobile ? "py-1 px-2" : "p-3"}`}
            key={chat.idConversation}
            onClick={() => onClick(chat)}>
            {isMobile ? (
                <ProfileImage
                    src={receiverUser.photo}
                    gender={receiverUser.civility}
                    size={48}
                />
            ) : (
                <div className="flex relative">
                    <div className="w-[70px] relative">
                        <ProfileImage
                            src={receiverUser.photo}
                            gender={receiverUser.civility}
                            size={48}
                        />
                        {receiverUser.isOnline && (
                            <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[42px] top-[8px]" />
                        )}
                    </div>
                    <div className="w-full h-full flex flex-col select-none py-2 pe-2">
                        <div
                            className="text-textGray text-sm font-semibold line-clamp-1"
                            title={`${receiverUser.firstName} ${receiverUser.lastName}`}>
                            {`${receiverUser.firstName} ${receiverUser.lastName}`}
                        </div>
                        <p
                            className={` pt-[4px] text-xs line-clamp-3 ${
                                chat.lastSenderId !== user.idUser &&
                                chat.unReadCount !== 0
                                    ? "text-primary font-bold"
                                    : "text-textSecondary font-medium"
                            } ${
                                chat.lastMessageType !== "message" || !chat.lastMessageId
                                    ? "italic"
                                    : "not-italic"
                            }`}>
                            {!!chat.lastMessageId ? chat.lastMessageType === "message"
                                ? chat.lastSenderId === user.idUser
                                    ? `${t("you")} : ${chat.lastMessage}`
                                    : chat.lastMessage
                                : chat.lastSenderId === user.idUser
                                ? t("youSentFile")
                                : t("youReceivedFile") : t("messageDeleted")}
                        </p>
                    </div>
                    <span className="absolute top-0 end-2 text-textGray text-xs">
                        {formatChatDate(new Date(chat.lastSend), i18n.language)}
                    </span>
                </div>
            )}
            {isCurrent && (
                <i className="w-1 h-full absolute bg-primary top-0 end-0" />
            )}
            {chat.lastSenderId !== user.idUser && chat.unReadCount !== 0 && (
                <>
                    <span className="absolute text-[10px] top-8 end-4 w-4 h-4 rounded-full bg-primary text-white flex justify-center align-center">
                        {chat.unReadCount > 9 ? "+9" : chat.unReadCount}
                    </span>
                    <i className="w-1 h-full absolute bg-primary top-0 start-0" />
                </>
            )}
        </div>
    );
};

export default ChatItem;
