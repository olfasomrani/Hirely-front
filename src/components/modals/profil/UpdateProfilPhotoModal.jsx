import ImageViewer from "@/components/ui/preview/ImageViewer";
import useAuth from "@/hooks/useAuth";
import useDragAndDrop from "@/hooks/useDragEvent";
import UserService from "@/services/user/user.service";
import { resizeImage } from "@/utils/transformer/imageResizer";
import { Button, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const UpdateProfilPhotoModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;
    const {
        file,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        fileInputRef,
        handleFileSelect,
    } = useDragAndDrop();

    const [preview, setPreview] = React.useState(user.photo || null);
    const [photo, setPhoto] = React.useState(null);
    const [isError, setIsError] = React.useState(false);
    const { t } = useTranslation("main");

    const { updateUser } = useAuth();

    const handleFile = async (file) => {
        const { resizedFile, file: previewFile } = await resizeImage(file, 200);
        setPhoto(resizedFile);
        setPreview(previewFile.path);
        if (isError) setIsError(false);
    };

    useEffect(() => {
        if (file) {
            handleFile(file);
        }
    }, [file]);

  const onSubmit = () => {
        if (isError) return;
        if (!photo) {
            setIsError(true);
          return;
        }
        UserService.updateProfilePhoto(photo)
            .then((res) => {
                updateUser({ photo: res.data?.photo?.path });
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            className="p-1 tablet:p-3 !top-5">
            <div
                className="w-full flex items-center justify-center overflow-hidden aspect-square mb-2"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <ImageViewer
                    src={preview}
                    ErrorImage={
                        user.gender === "madam"
                            ? "/icons/gender/profileAvatarWomen.jpg"
                            : "/icons/gender/profileAvatarMen.jpg"
                    }
                    className="rounded-lg overflow-hidden w-full h-auto"
                    wrapperClassName="w-full transition-all duration-300"
                />
            </div>
            <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className={`border-[1px] outline-none ${
                    isError ? "border-red-500" : "border-gray-200"
                } `}
            />
            <span className="text-red-500 font-light text-xs h-4  block px-3 py-1">
                {isError && t("photoRequired")}
            </span>
            <div className="flex justify-between pt-2">
                <Button onClick={onClose}>{t("cancel")}</Button>
                <Button type="primary" onClick={onSubmit}>
                    {t("submit")}
                </Button>
            </div>
        </Modal>
    );
};

export default UpdateProfilPhotoModal;
