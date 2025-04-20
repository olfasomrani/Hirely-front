import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const SexeRadio = ({
    setValue,
    watch,
    register,
    errors,
    clearErrors,
    className = "",
    name = "civility",
    required,
}) => {
    const { t } = useTranslation("main");
    const blockRef = useRef();
    const currentValue = watch(name);
    const radioOptions = [
        {
            value: "sir",
            label: t("man"),
        },
        {
            value: "madam",
            label: t("woman"),
        },
        {
            value: "indefinite",
            label: t("indefinite"),
        },
    ];

    useEffect(() => {
        if (errors[name])
            blockRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }, [errors]);

    return (
        <div className={`w-full ${className}`} ref={blockRef}>
            <input
                value={currentValue}
                className="w-0 h-0 hidden"
                {...register(name, { required })}
            />
            <div className={`text-black text-sm font-normal`}>
                {t("sexe")}
                {required && <span className="text-red-500">{" *"}</span>}
            </div>
            <div className="w-full flex flex-wrap gap-2 mt-1">
                {radioOptions.map((radio) => {
                    return (
                        <div
                            className={`border-[1px] text-sm font-normal rounded-lg py-1 px-3 cursor-pointer ${
                                errors?.[name]
                                    ? "bg-white text-black border-red-500 "
                                    : currentValue === radio.value
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-black border-black"
                            }`}
                            onClick={() => {
                                setValue(name, radio.value);
                                if (errors?.[name]) {
                                    clearErrors(name);
                                }
                            }}
                            key={radio.value}>
                            {radio.label}
                        </div>
                    );
                })}
            </div>
            {errors && (
                <span className="text-red-500 text-xs h-4 font-light  block px-3 py-1">
                    {errors[name] && t("sexeRequired")}
                </span>
            )}
        </div>
    );
};

export default SexeRadio;
