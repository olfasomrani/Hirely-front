import ProfileImage from "@/components/ui/preview/ProfileImage";
import { BsThreeDots } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ChatInput from "../ui/ChatInput";
import useMessage from "@/hooks/useMessage";
import { getSinceDate } from "@/utils/helpers";
import { useTranslation } from "react-i18next";

const FakeFloatChat = ({
    receiver,
    height,
    isChatListOpen,
    setIsChatListOpen,
    removeFromStack,
    chatKey,
}) => {
    const { pushFakeChatToStack } = useMessage();
    const { t ,i18n : {language}} = useTranslation("main");
    const onSend = (data) => {
        pushFakeChatToStack(data);
    };
    return (
        <>
            <div
                className=" relative w-full h-[50px] bg-black rounded-t-[6px] p-[1px] cursor-pointer flex flex-row justify-between items-center"
                style={{
                    maxHeight: height - 150,
                }}>
                <div className="flex gap-2 px-1 items-center">
                    <ProfileImage
                        src={receiver?.photo}
                        gender={receiver?.civility}
                        size={40}
                    /> 
                     <div className="flex flex-col">
                    <div
                        className="text-white line-clamp-1"
                        title={`${receiver?.firstName} ${receiver?.lastName}`}>
                        {`${receiver?.firstName} ${receiver?.lastName}`}
                    </div>
                    {receiver.isOnline && (
                        <span className="w-2 h-2 rounded-full bg-lemonGreen absolute start-[38px] top-[8px]" />
                    )}
                {isChatListOpen && (
                    <div className="text-white text-[9px]">
                        {receiver.isOnline
                            ? t("online")
                            : getSinceDate(receiver.lastOnline, language)}
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
                <div className="w-full bg-white h-[300px] flex items-end justify-center">
                    <ChatInput receiverId={receiver.idUser} onSend={onSend} />
                </div>
            )}
        </>
    );
};

export default FakeFloatChat;
