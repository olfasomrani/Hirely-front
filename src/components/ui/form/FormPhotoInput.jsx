import { resizeImage } from "@/utils/transformer/imageResizer";
import React, { useId } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";
import ImageViewer from "../preview/ImageViewer";

function FormPhotoInput({
    name = "photo",
    control,
    required,
    errors,
    defaultValue = null,
    clearErrors,
}) {
    const id = useId();
    const { t } = useTranslation("main");
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                ...(required
                    ? {
                          validate: (value) => value || t("photoRequired"),
                      }
                    : {}),
            }}
            render={({ field: { onChange } }) => {
                const [preview, setPreview] = React.useState(defaultValue);
                const handleFileChange = async (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const { resizedFile, file: previewFile } =
                            await resizeImage(file, 200);
                        onChange(resizedFile);
                        setPreview(previewFile);
                        if (errors?.[name]) clearErrors(name);
                    }
                };
                const handleDragOver = (event) => {
                    event.preventDefault();
                };
                const handleDrop = async (event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files[0];
                    if (file) {
                        const { resizedFile, file: previewFile } =
                            await resizeImage(file, 200);
                        onChange(resizedFile);
                        setPreview(previewFile);
                        if (errors?.[name]) clearErrors(name);
                    }
                };
                const chooseFile = () => {
                    document.getElementById(id).click();
                };
                return (
                    <div>
                        <div
                            className="w-full h-20 flex justify-start items-center gap-x-2 relative"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={chooseFile}>
                            <input
                                className="w-0 h-0 hidden"
                                type="file"
                                id={id}
                                onChange={(event) => {
                                    handleFileChange(event);
                                }}
                            />
                            <div
                                className={`border-2 cursor-pointer flex items-center justify-center h-20 w-20 rounded-lg overflow-hidden ${
                                    preview?.path
                                        ? "border-primary"
                                        : "border-black"
                                }`}
                                role="presentation">
                                {preview?.path ? (
                                    <ImageViewer
                                        src={preview?.path}
                                        className=""
                                    />
                                ) : (
                                    <FaPlus size={30} color="black" />
                                )}
                            </div>
                            <p className="text-black text-sm font-medium line-clamp-1">
                                {preview?.path
                                    ? preview?.name
                                    : t("chosePhoto")}
                            </p>
                        </div>
                        {errors && (
                            <span className="text-red-500 text-xs h-4 font-light  block px-3 py-1">
                                {errors[name] && "Photo is required"}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );
}

export default FormPhotoInput;
