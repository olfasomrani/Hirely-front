import React from "react";
import { useRouter } from "next/navigation";
import SendMsgButton from "../uis/forms/SendMsgButton";

import ChatService from "@/services/chats/chats.service";
import useMessage from "@/hooks/useMessage";
import useAuth from "@/hooks/useAuth";
import ProfileImage from "../ui/preview/ProfileImage";

const NetworkCard = ({ user }) => {
    const router = useRouter();

    const {
        user: { role: userRole },
    } = useAuth();
    const { pushToStack, createFakeChat } = useMessage();

    const handleNavigate = () => {
        if (userRole === "member") {
            router.push(`/member/network/${user.idUser}`);
        } else if (userRole === "noMember") {
            router.push(`/noMember/network/${user.idUser}`);
        }
    };

    const handleSendMessage = (e) => {
        e.stopPropagation();
        ChatService.getChatBetween(user.idUser)
            .then((res) => {
                const chat = res.data;
                if (chat) pushToStack(chat);
                else createFakeChat(user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            onClick={handleNavigate}
            className="flex items-center p-4 mb-4 bg-white h-[140px] cursor-pointer"
            style={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
            }}>
            <ProfileImage
                alt={`${user.firstName} ${user.lastName}`}
                className="me-4"
                src={user.photo}
                gender={user.civility}
                size={90}
            />
            <div className="flex-1">
                <h3 className="md:text-lg text-sm font-semibold">
                    {user.firstName} {user.lastName}
                </h3>
                <p className="md:text-sm text-xs text-gray-500">
                    {user.company?.companyName}
                </p>
                <p className="md:text-sm text-xs text-gray-500">
                    {user.countries?.join(", ")}
                </p>
            </div>
            <div>
                <div className="hidden lg:block">
                    <SendMsgButton
                        icon="/icons/network/message-dots.svg"
                        label="Message"
                        onClick={handleSendMessage}
                    />
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={handleSendMessage}
                        className="bg-white rounded-full">
                        <img
                            src="/icons/network/message-dots.svg"
                            alt="Message"
                            className="w-10 h-10"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NetworkCard;
