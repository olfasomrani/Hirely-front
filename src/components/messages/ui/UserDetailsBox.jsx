import ProfileImage from "@/components/ui/preview/ProfileImage";
import { TbBrandLinkedin } from "react-icons/tb";
import { SlEnvolope } from "react-icons/sl";
import tailwindConfig from "../../../../tailwind.config";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const UserDetailsBox = ({ user, isMobile }) => {
    if (!user) return <div></div>;
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
                    src={user.photo}
                    gender={user.civility}
                    size={100}
                    border={3}
                    borderColor={tailwindConfig.theme.extend.colors.primary}
                    preview
                />
                <div className="text-xl text-black font-bold">{`${user.firstName} ${user.lastName}`}</div>
                <div className="flex justify-center items-center gap-3">
                    {user.linkedinLink && (
                        <a href={user.linkedinLink} target="_blank">
                            <TbBrandLinkedin
                                size={18}
                                className="cursor-pointer"
                                color="black"
                            />
                        </a>
                    )}
                    {user.email && (
                        <a href={`mailto:${user.email}`}>
                            <SlEnvolope
                                size={18}
                                className="cursor-pointer"
                                color="black"
                            />
                        </a>
                    )}
                </div>
            </div>
            <div
                className={`${
                    isMobile ? "" : "shadow-center rounded-xl"
                } w-full bg-white p-3 flex flex-col gap-1`}>
                <div classame="font-semibold">{t("generalInfos")}</div>
                {user.post && (
                    <div className="grid grid-cols-[30px_1fr] text-sm font-medium">
                        <FaRegBuilding
                            size={18}
                            color="black"
                            className="ms-[2px]"
                        />
                        {user.post}
                    </div>
                )}
                {user.address && (
                    <div className="grid grid-cols-[30px_1fr] pt-1 text-sm font-medium">
                        <IoLocationOutline
                            size={20}
                            color="black"
                            className="mt-[2px]"
                        />
                        {user.address}
                    </div>
                )}
                {user.phone && (
                    <div className="grid grid-cols-[30px_1fr] text-sm font-medium">
                        <FiPhone size={18} color="black" className="ms-[2px]" />
                        {user.phone}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailsBox;
