import ProfileImage from "@/components/ui/preview/ProfileImage";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import { useState } from "react";
import ReactDOM from "react-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import FloatChatBodyViewer from "./FloatChatBodyViewer";
import useMessage from "@/hooks/useMessage";
import FakeFloatChat from "./FakeFloatChat";
import { getSinceDate } from "@/utils/helpers";
import { useTranslation } from "react-i18next";
import FloatChatBot from "../chatBot/FloatChatBot";
import getDisabledUserData from "@/utils/data/deletedUser";

const ChatStackManager = ({ user }) => {
    const { height } = useDeviceDimension();
    const { setIsChatListOpen, removeFromStack, currentStack } = useMessage();
    const {
        t,
        i18n: { language },
    } = useTranslation("main");

    return (
        <>
            {currentStack.map(
                ({ key, isChatListOpen, stack, isFake, isChatBot }, index) => {
                    const receiverUser =
                        stack?.participants?.[0] &&
                        stack.participants?.[0]?.isActive
                            ? stack.participants?.[0]
                            : getDisabledUserData(language);
                    return ReactDOM.createPortal(
                        <div
                            className="fixed bottom-0 w-[300px] z-[9999] shadow-center"
                            style={{
                                insetInlineEnd: 344 + 312 * index,
                            }}
                            key={key}>
                            {isFake && (
                                <FakeFloatChat
                                    chatKey={key}
                                    receiver={stack}
                                    height={height}
                                    isChatListOpen={isChatListOpen}
                                    setIsChatListOpen={setIsChatListOpen}
                                    removeFromStack={removeFromStack}
                                />
                            )}
                            {isChatBot && (
                                <FloatChatBot
                                    chatKey={key}
                                    stack={stack}
                                    height={height}
                                    user={user}
                                    isChatListOpen={isChatListOpen}
                                    setIsChatListOpen={setIsChatListOpen}
                                    removeFromStack={removeFromStack}
                                />
                            )}
                            {!isFake && !isChatBot && (
                                <>
                                    <div
                                        className=" relative w-full h-[50px] bg-black rounded-t-[6px] p-[1px] cursor-pointer flex flex-row justify-between items-center"
                                        style={{
                                            maxHeight: height - 150,
                                        }}>
                                        {!isChatListOpen &&
                                            stack.lastSenderId !==
                                                user.idUser &&
                                            stack.unReadCount !== 0 && (
                                                <span className="absolute text-[10px] top-[17px] end-[103px] w-4 h-4 rounded-full bg-primary text-white flex justify-center align-center">
                                                    {stack.unReadCount > 9
                                                        ? "+9"
                                                        : stack.unReadCount}
                                                </span>
                                            )}
                                        <div className="flex gap-2 px-1 items-center relative">
                                            <ProfileImage
                                                src={receiverUser.photo}
                                                gender={receiverUser.civility}
                                                size={40}
                                            />
                                            {receiverUser.isOnline && (
                                                <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[38px] top-[8px]" />
                                            )}
                                            <div className="flex flex-col">
                                                <div
                                                    className="text-white line-clamp-1"
                                                    title={`${receiverUser.firstName} ${receiverUser.lastName}`}>
                                                    {`${receiverUser.firstName} ${receiverUser.lastName}`}
                                                </div>
                                                {isChatListOpen &&
                                                    receiverUser.lastOnline && (
                                                        <div className="text-white text-[9px]">
                                                            {stack
                                                                ?.participants?.[0]
                                                                ?.isOnline
                                                                ? t("online")
                                                                : getSinceDate(
                                                                      stack
                                                                          ?.participants?.[0]
                                                                          ?.lastOnline,
                                                                      language
                                                                  )}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center pe-2">
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
                                                    onClick={() =>
                                                        setIsChatListOpen(
                                                            key,
                                                            false
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <IoIosArrowUp
                                                    size={24}
                                                    color="white"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        setIsChatListOpen(
                                                            key,
                                                            true
                                                        )
                                                    }
                                                />
                                            )}
                                            <GrFormClose
                                                size={24}
                                                color="white"
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    removeFromStack(key)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {isChatListOpen && (
                                        <div className="w-full bg-white h-[300px]">
                                            <FloatChatBodyViewer
                                                chat={stack}
                                                user={user}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>,
                        document.body
                    );
                }
            )}
        </>
    );
};

export default ChatStackManager;
