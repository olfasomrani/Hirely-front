import React from "react";
import ImageViewer from "../ui/preview/ImageViewer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const NoAuthBox = ({ children, canGoBack, onGoBack }) => {
    const { t } = useTranslation("main");
    return (
        <div className="w-full min-h-screen  desktop:min-h-[400px] p-3 relative">
            {canGoBack && (
                <div
                    className=" flex gap-x-2 items-center cursor-pointer absolute start-5 top-3"
                    onClick={onGoBack}>
                    <FaArrowLeftLong size={18} color="black" role="button" />
                    {t("back")}
                </div>
            )}
            <div
                className={`w-full flex justify-end ${
                    canGoBack ? "pb-4" : "pb-2"
                } pt-1`}>
                <ImageViewer
                    src="/images/logo/logoBusiness.svg"
                    alt="Company Logo"
                    className="!w-[150px] desktop:!w-[300px]"
                />
            </div>
            <div className=" w-full md:w-3/4 h-full pb-5">{children}</div>
            <span className="absolute bottom-0 right-[100px] w-[70px] h-24 bg-primary rounded-t-full hidden md:block" />
            <span className="absolute bottom-0 right-[20px] w-[70px] h-24 bg-black rounded-t-full hidden md:block" />
        </div>
    );
};

export default NoAuthBox;
