import {
    messageValidation,
    minLengthValidation,
    passPatternValidation,
} from "@/utils/formValidation";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

function PasswordInput({
    register,
    required,
    setValue,
    withoutStar,
    errors,
    containerClassName = "",
    noPlc,
    options,
    onlyOptions,
    ...props
}) {
    const [showText, setShowText] = useState(false);
    const { t } = useTranslation("main");
    const id = useId();
    return (
        <div className={`relative w-full ${containerClassName}`}>
            <label htmlFor={id} className="text-sm font-normal">
                {t("password")}
                {!withoutStar && required && (
                    <span className="text-red-600"> *</span>
                )}
            </label>
            <input
                {...props}
                className={`w-full mt-1 font-normal text-sm h-10 border-[1px] rounded-lg outline-none  rounded-2 px-3 bg-transparent placeholder:!text-sm ${
                    errors && errors["password"]
                        ? "border-red-500 shadow-red-500"
                        : "border-gray-400"
                } ${props.className || ""}`}
                {...register(
                    "password",
                    onlyOptions
                        ? {
                              ...onlyOptions,
                              ...(required
                                  ? {
                                        required: messageValidation(
                                            t("passwordRequired")
                                        ),
                                    }
                                  : {}),
                          }
                        : {
                              ...(required
                                  ? {
                                        required: messageValidation(
                                            t("passwordRequired")
                                        ),
                                    }
                                  : {}),
                              pattern: passPatternValidation(
                                  t("passwordPattern")
                              ),
                              minLength: minLengthValidation(
                                  10,
                                  t("passwordMinLength")
                              ),
                              ...options,
                          }
                )}
                placeholder={noPlc ? "" : t("passwordplc")}
                type={showText ? "text" : "password"}
                id={id}
                autoComplete="off"
            />
            <span className="absolute end-2 top-10 cursor-pointer">
                {showText ? (
                    <GoEye
                        size={18}
                        color="#aaaaaa"
                        onClick={() => setShowText(false)}
                    />
                ) : (
                    <GoEyeClosed
                        size={18}
                        color="#aaaaaa"
                        onClick={() => setShowText(true)}
                    />
                )}
            </span>
            {errors && (
                <span className="text-red-500 font-light text-xs h-4  block px-3 py-1">
                    {errors?.["password"]?.message}
                </span>
            )}
        </div>
    );
}

export default PasswordInput;
