import React from "react";
import { useTranslation } from "react-i18next";
import { GrFormClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProfileImage from "@/components/ui/preview/ProfileImage";
import ChatBotContainer from "./ChatBotContainer";

const FloatChatBot = ({
    height,
    setIsChatListOpen,
    removeFromStack,
    isChatListOpen,
    chatKey,
    user,
}) => {
    const { t } = useTranslation("main");

    return (
        <>
            <div
                className=" relative w-full h-[50px] bg-primary rounded-t-[6px] p-[1px] cursor-pointer flex flex-row justify-between items-center"
                style={{
                    maxHeight: height - 150,
                }}>
                <div className="flex gap-2 px-1 items-center">
                    <ProfileImage
                        src={"/images/logo/logoChatBot.png"}
                        size={40}
                    />
                    <div
                        className="text-black line-clamp-1"
                        title={t("chatbot")}>
                        {t("chatbot")}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[38px] top-[8px]" />
                </div>
                <div className="flex gap-2 items-center pe-2">
                    {isChatListOpen ? (
                        <IoIosArrowDown
                            size={24}
                            color="white"
                            className="cursor-pointer"
                            onClick={() => setIsChatListOpen(chatKey, false)}
                        />
                    ) : (
                        <IoIosArrowUp
                            size={24}
                            color="white"
                            className="cursor-pointer"
                            onClick={() => setIsChatListOpen(chatKey, true)}
                        />
                    )}
                    <GrFormClose
                        size={24}
                        color="white"
                        className="cursor-pointer"
                        onClick={() => removeFromStack(chatKey)}
                    />
                </div>
            </div>
            {isChatListOpen && (
                <div className="w-full bg-white h-[300px] grid grid-cols-1 grid-rows-[1fr_80px]">
                    <ChatBotContainer user={user} />
                </div>
            )}
        </>
    );
};

export default FloatChatBot;
