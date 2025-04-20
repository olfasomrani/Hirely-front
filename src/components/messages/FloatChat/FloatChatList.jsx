import useDeviceDimension from "@/hooks/useDeviceDimension";
import { useState } from "react";
import ReactDOM from "react-dom";
import ChatItem from "../ChatList/ChatItem";
import ProfileImage from "@/components/ui/preview/ProfileImage";
import { useTranslation } from "react-i18next";
import ImageViewer from "@/components/ui/preview/ImageViewer";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ChatBotItem from "../chatBot/ChatBotItem";

const FloatChatList = ({ chats, user, onSelectChat, createFloatChatBot }) => {
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const { t } = useTranslation();
    const { height } = useDeviceDimension();
    return ReactDOM.createPortal(
        <div className="fixed bottom-0 end-3 w-[320px] z-[9999]  shadow-center bg-white">
            <div
                className="w-full h-[50px] bg-black rounded-t-[6px] p-[5px] cursor-pointer flex flex-row justify-between items-center"
                style={{
                    maxHeight: height - 150,
                }}>
                <div className="flex gap-2 px-1 items-center">
                    <ProfileImage
                        src={user.photo}
                        gender={user.civility}
                        size={40}
                    />
                    <div className="text-white">{t("messagerie")}</div>
                </div>
                <div className="flex gap-2 items-center pe-2">
                    <div className="w-12 h-12">
                        <ImageViewer
                            src={"/icons/social/newMessage.svg"}
                            className="w-12 h-12 cursor-pointer"
                        />
                    </div>
                    <BsThreeDots
                        size={24}
                        color="white"
                        className="cursor-pointer"
                    />
                    {isChatListOpen ? (
                        <IoIosArrowDown
                            size={24}
                            color="white"
                            className="cursor-pointer"
                            onClick={() => setIsChatListOpen(false)}
                        />
                    ) : (
                        <IoIosArrowUp
                            size={24}
                            color="white"
                            className="cursor-pointer"
                            onClick={() => setIsChatListOpen(true)}
                        />
                    )}
                </div>
            </div>
            {isChatListOpen && (
                <div className="w-full overflow-y-scroll no-scroll-y pt-4">
                    <ChatBotItem
                        user={user}
                        onClick={createFloatChatBot}
                        isListed
                    />
                    {chats.map((c) => (
                        <ChatItem
                            chat={c}
                            user={user}
                            onClick={onSelectChat}
                            key={c.idConversation}
                        />
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
};

export default FloatChatList;
