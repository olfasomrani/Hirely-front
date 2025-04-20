import ProfileImage from "@/components/ui/preview/ProfileImage";
import useMessage from "@/hooks/useMessage";
import React from "react";
import { useTranslation } from "react-i18next";

const ChatBotItem = ({ user, onClick, isMobile, isCurrent, isListed }) => {
    const { t } = useTranslation("main");

    const { chatbot: chat } = useMessage();

    return (
        <div
            className={`w-full relative cursor-pointer  ${
                isListed ? "shadow bg-primary"
                    : isCurrent
                        ? "bg-white shadow"
                        : "bg-primary"
            } ${isMobile ? "py-1 px-2" : "p-3"}`}
            key={"chatbot"}
            onClick={() => onClick(chat)}>
            {isMobile ? (
                <ProfileImage src={"/images/logo/logoChatBot.png"} size={48} />
            ) : (
                <div className="flex relative">
                    <div className="w-[70px] relative">
                        <ProfileImage
                            src={"/images/logo/logoChatBot.png"}
                            size={48}
                        />
                        <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[42px] top-[8px]" />
                    </div>
                    <div className="w-full h-full flex flex-col select-none py-2 pe-2">
                        <div
                            className="text-textGray text-sm font-semibold line-clamp-1"
                            title={t("chatbot")}>
                            {t("chatbot")}
                        </div>
                        <p
                            className={` pt-[4px] text-xs line-clamp-3 text-textSecondary font-bold `}>
                            {chat.lastSenderId === user.idUser
                                ? `${t("you")} : ${chat.lastMessage}`
                                : chat.lastMessage}
                        </p>
                    </div>
                </div>
            )}
            {isCurrent && (
                <i className="w-1 h-full absolute bg-primary top-0 end-0" />
            )}
        </div>
    );
};

export default ChatBotItem;
