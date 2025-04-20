import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiZip } from "react-icons/tfi";
import { CiFileOn } from "react-icons/ci";
import { getFileSize } from "@/utils/helpers";
import { useTranslation } from "react-i18next";

const DocumentPreview = ({ type, file, isReceiver }) => {
    const {
        i18n: { language },
    } = useTranslation();

    const handleDownload = async () => {
        const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${file.path}`;
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className={`w-full grid grid-cols-[auto_1fr] px-1 gap-x-2 items-center  rounded-[5px]  ${
                isReceiver ? "bg-gray-100" : "bg-primary"
            }`}>
            <div
                className="w-[35px] h-[35px] p-[2.5px] bg-slate-300 rounded-[5px] cursor-pointer"
                onClick={handleDownload}>
                {type === "doc" && <IoDocumentTextOutline size={30} />}
                {type === "zip" && <TfiZip size={30} />}
                {!type && <CiFileOn size={30} />}
            </div>
            <div className="w-full grid">
                <p
                    className="text-xs font-bold line-clamp-1 tetx-wrap"
                    title={file.name}>
                    {file.name}
                </p>
                <p className="text-[10px]">{getFileSize(file.size, language)}</p>
            </div>
        </div>
    );
};

export default DocumentPreview;
