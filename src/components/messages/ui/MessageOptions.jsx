import { AiTwotoneDelete } from "react-icons/ai";
import MessageService from "@/services/messages/message.service";
import colors from "tailwindcss/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const MessageOptions = ({ id, onDelete , right }) => {
    const { t } = useTranslation("main");
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={divRef}>
            <span
                className="text-xl font-bold"
                onClick={() => setIsOpen((p) => !p)}>
                ...
            </span>
            {isOpen && (
                <div
                    onClick={() => {
                        MessageService.deleteMessage(id)
                            .then((res) => {
                                onDelete(res.data);
                                setIsOpen(false);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                    className={`flex items-center gap-x-1 absolute px-2 py-2 rounded-[4px] bg-white shadow-center text-sm z-30 ${right ? "start-0" : "end-0"}`}>
                    <AiTwotoneDelete size={20} color={colors.red["600"]} />
                    {t("delete")}
                </div>
            )}
        </div>
    );
};

export default MessageOptions;
