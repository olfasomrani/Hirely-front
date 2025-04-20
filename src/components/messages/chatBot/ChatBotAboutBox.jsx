import ProfileImage from "@/components/ui/preview/ProfileImage";
import tailwindConfig from "../../../../tailwind.config";
import { useTranslation } from "react-i18next";

const ChatBotAboutBox = ({ isMobile }) => {
    const { t } = useTranslation("main");
    return (
        <div
            className={`${
                isMobile ? "w-full h-full" : "flex flex-col gap-y-4 p-4"
            } overflow-scroll no-scroll-y`}>
            <div
                className={`${
                    isMobile ? "mb-4" : "shadow-center rounded-xl"
                } w-full bg-white flex flex-col items-center justify-center gap-1 px-3 pb-5 pt-7`}>
                <ProfileImage
                    src={"/images/logo/logoChatBot.png"}
                    size={100}
                    border={3}
                    borderColor={tailwindConfig.theme.extend.colors.primary}
                    preview
                />
                <div className="text-lg text-black font-medium">
                    {t("chatbot")}
                </div>
                <div className="flex text-primary text-sm font-semibold justify-center items-center gap-3">
                    {t("chatbotTitle")}
                </div>
            </div>
            <div
                className={`${
                    isMobile ? "" : "shadow-center rounded-xl"
                } w-full bg-white p-3 flex flex-col gap-3 font-medium`}>
                <div>{t("generalInfos")}</div>
                <p className="text-xs text-primary font-medium">
                    {t("chatbotDescription")}
                </p>
            </div>
        </div>
    );
};

export default ChatBotAboutBox;
