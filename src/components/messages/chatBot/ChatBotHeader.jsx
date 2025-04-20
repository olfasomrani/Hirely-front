import ProfileImage from "@/components/ui/preview/ProfileImage";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsThreeDots } from "react-icons/bs";

const ChatBotHeader = ({ openAboutModal, isMobile }) => {
    const { t } = useTranslation("main");
    return (
        <div className="w-full p-4">
            <div className="h-14 bg-white shadow-center  rounded-[8px] flex justify-between items-center">
                <div className="h-full flex gap-x-2 px-3 items-center relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ProfileImage
                            src="/images/logo/logoChatBot.png"
                            size={40}
                        />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[46px] top-[12px]" />
                    <div>
                        <div
                            className="text-sm text-textSecondary font-semibold line-clamp-1"
                            title={t("chatbot")}>
                            {t("chatbot")}
                        </div>
                        <div className="text-xs text-textSecondary">
                            {t("online")}
                        </div>
                    </div>
                </div>
                <div className="h-full flex gap-x-3 px-5 items-center">
                    {isMobile && (
                        <BsThreeDots
                            size={22}
                            color="black"
                            onClick={openAboutModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBotHeader;
