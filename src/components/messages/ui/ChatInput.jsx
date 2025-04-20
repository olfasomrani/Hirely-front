import MessageService from "@/services/messages/message.service";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import tailwindConfig from "../../../../tailwind.config";
import useDragAndDrop from "@/hooks/useDragEvent";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiZip } from "react-icons/tfi";
import { CiFileOn } from "react-icons/ci";
import { getFileSize } from "@/utils/helpers";
import { useTranslation } from "react-i18next";
import { FaRegImage } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { MdAudioFile } from "react-icons/md";

const ChatInput = ({ chatId, receiverId, onSend, chatBot = false }) => {
    const [inputValue, setInputValue] = useState("");
    const {
        i18n: { language },
    } = useTranslation();
    const {
        file,
        extType,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        removeFile,
        fileInputRef,
        handleFileSelect,
        triggerFileInput,
    } = useDragAndDrop();

    const handleSubmit = () => {
        if (inputValue.trim() === "" && !file) return;
        if (chatBot) {
            onSend(inputValue.trim());
            setInputValue("");
            return;
        }
        let form;
        if (!file)
            form = {
                ...(chatId ? { chat: chatId } : {}),
                receiver: receiverId,
                content: inputValue.trim(),
            };
        else {
            form = new FormData();
            form.append("attachment", file);
            form.append("receiver", receiverId);
            if (inputValue.trim() !== "")
                form.append("content", inputValue.trim());
            if (chatId) form.append("chat", chatId);
        }

        MessageService.createMessage(form)
            .then((res) => {
                setInputValue("");
                if (file) removeFile();
                onSend?.(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            className="w-full h-[80px] pb-5 pt-1 px-4"
            {...(chatBot
                ? {}
                : {
                      onDragOver: handleDragOver,
                      onDragLeave: handleDragLeave,
                      onDrop: handleDrop,
                  })}>
            <div className="relative h-full bg-white shadow-center  rounded-[8px] flex justify-center items-center border-[2px] focus-within:border-black px-3">
                {!chatBot && (
                    <FaPlus
                        size={20}
                        color="black"
                        className="cursor-pointer"
                        onClick={triggerFileInput}
                    />
                )}
                <textarea
                    className="h-full w-full focus:outline-none px-4 py-2 text-textSecondary text-sm font-medium"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                />
                <div
                    className={`w-[34px] h-[32px] flex items-center justify-center rounded-[4px] shadow-center pe-1 ${
                        inputValue.trim() === "" && !file
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    } no-scroll-y`}
                    onClick={handleSubmit}
                    role="button">
                    <LuSend
                        size={22}
                        color={tailwindConfig.theme.extend.colors.primary}
                    />
                </div>
                {file && !chatBot && (
                    <div className="absolute top-0 -translate-y-full w-full px-5 py-[6px] bg-white shadow-center  rounded-[8px] flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-[40px] h-[40px] p-[5px] bg-slate-300 rounded-[5px] ">
                                {extType === "img" && <FaRegImage size={30} />}
                                {extType === "aud" && <MdAudioFile size={30} />}
                                {extType === "vid" && (
                                    <MdOndemandVideo size={30} />
                                )}
                                {extType === "doc" && (
                                    <IoDocumentTextOutline size={30} />
                                )}
                                {extType === "zip" && <TfiZip size={30} />}
                                {!extType && <CiFileOn size={30} />}
                            </div>
                            <div className="flex flex-col px-2 justify-between">
                                <p
                                    className="text-[14px] font-bold line-clamp-1"
                                    title={file.name}>
                                    {file.name}
                                </p>
                                <p>{getFileSize(file.size, language)}</p>
                            </div>
                        </div>
                        <MdOutlineCancel
                            size={30}
                            color="black"
                            onClick={removeFile}
                            className="cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatInput;
