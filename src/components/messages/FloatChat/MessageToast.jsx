import ProfileImage from "@/components/ui/preview/ProfileImage";
import useToast from "@/hooks/useToast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MessageToast = ({ clearMessage, message, user, shouldNotify }) => {
    return null;
    const { toast, toastTypes } = useToast();
    const { t } = useTranslation("main");
    const navigation = useRouter();
    useEffect(() => {
        if (message && shouldNotify) {
            const sender = message.chat.participants.find(
                (e) => e.idUser !== user.idUser
            );
            toast(
                <div
                    className="flex p-3 gap-3"
                    onClick={() =>
                        navigation.push(
                            `/member/messaging?chatId=${message.chat.idConversation}`
                        )
                    }>
                    <ProfileImage
                        src={sender.photo}
                        gender={sender.civility}
                        size={60}
                        className="w-[60px]"
                    />
                    <div className="line-clamp-2">
                        {message.chat.lastMessageType === "message"
                            ? message.chat.lastMessage
                            : t("youReceivedFile")}
                    </div>
                </div>,
                toastTypes.INFO,
                true
            );
            clearMessage();
        }
    }, [message]);
    return null;
};

export default MessageToast;
