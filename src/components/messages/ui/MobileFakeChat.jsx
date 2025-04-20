import ProfileImage from "@/components/ui/preview/ProfileImage";
import ReactDOM from "react-dom";
import { BsThreeDots } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import ChatInput from "./ChatInput";
import useDeviceDimension from "@/hooks/useDeviceDimension";
import useMessage from "@/hooks/useMessage";

const MobileFakeChat = ({ receiver, onClose }) => {

    const { handleChatNavigate } = useMessage();
    const onSend = (data) => {
        handleChatNavigate(data.idConversation);
    };
    const { height } = useDeviceDimension();

    return ReactDOM.createPortal(
        <div className="fixed top-0 start-0 w-screen h-screen z-[9999]">
            <div className=" relative w-full h-[50px] bg-black rounded-t-[6px] p-[1px] cursor-pointer flex flex-row justify-between items-center">
                <div className="flex gap-2 px-1 items-center">
                    <ProfileImage
                        src={receiver?.photo}
                        gender={receiver?.civility}
                        size={40}
                    />
                    <div className="text-white">
                        {`${receiver?.firstName} ${receiver?.lastName}`}
                    </div>
                </div>
                <div className="flex gap-2 items-center pe-2">
                    <BsThreeDots
                        size={24}
                        color="white"
                        className="cursor-pointer"
                    />
                    <GrFormClose
                        size={24}
                        color="white"
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>
            </div>
            <div
                className="w-full bg-white flex items-end justify-center"
                style={{ height: height - 50 }}>
                <ChatInput receiverId={receiver.idUser} onSend={onSend} />
            </div>
        </div>,
        document.body
    );
};

export default MobileFakeChat;
