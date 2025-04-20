import React from "react";
import ChatBotAboutBox from "./ChatBotAboutBox";
import { IoMdArrowRoundBack } from "react-icons/io";

const ChatBotAboutModal = ({ onClose, isOpen }) =>
    isOpen && (
        <div className="!w-screen !h-screen fixed top-0 start-0 overflow-y-scroll no-scroll-y bg-white p-3">
            <IoMdArrowRoundBack
                size={30}
                color="black"
                className="cursor-pointer"
                onClick={onClose}
            />
            <ChatBotAboutBox isMobile />
        </div>
    );

export default ChatBotAboutModal;
