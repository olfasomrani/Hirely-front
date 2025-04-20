import React, { useEffect, useId, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import libphonenumber from "libphonenumber-js";

function FormPhoneInput({
    name,
    label,
    control,
    required,
    errors,
    containerClassName = "",
    setValue,
    setError,
    clearErrors,
    ...props
}) {
    const id = useId();
    const { t } = useTranslation("main");
    const isPhoneValid = (phone) => {
        const phoneNumber = libphonenumber(phone);
        return phoneNumber ? phoneNumber.isValid() : false;
    };

    return (
        <div className={`relative w-full ${containerClassName}`}>
            <label htmlFor={id} className="text-sm font-normal">
                {label}
                {required && <span className="text-red-600"> *</span>}
            </label>
            <Controller
                control={control}
                name={name}
                rules={{
                    validate: (value) => {
                        const phoneValue =
                            value.split(" ")?.slice(1)?.join(" ") || "";
                        if (required && phoneValue === "") {
                            return t("phoneRequired");
                        } else if (!isPhoneValid(value) && phoneValue !== "") {
                            return t("phoneInvalid");
                        }
                        return true;
                    },
                }}
                render={({ field: { onChange: fieldOnChange, value } }) => {
                    const [code, ...rest] = (value || "").split(" ");
                    const [phoneValue, setPhoneValue] = useState(
                        rest?.join(" ") || ""
                    );
                    const [phoneCode, setPhoneCode] = useState(code || "+1");
                    const [countryIso, setCountryIso] = useState(() => {
                        if (value) {
                            const phoneNumber = libphonenumber(value);
                            if (phoneNumber?.country)
                                return phoneNumber.country.toLowerCase();
                        }

                        return "fr";
                    });
                    const [isTouched, setIsTouched] = useState(0);

                    useEffect(() => {
                        if (isTouched < 3) {
                            setValue(name, `${phoneCode} ${phoneValue}`, {
                                shouldValidate: false,
                                shouldDirty: true,
                                shouldTouch: false,
                            });
                            setIsTouched((p) => p + 1);
                        } else {
                            fieldOnChange(`${phoneCode} ${phoneValue}`);
                        }
                    }, [phoneValue, phoneCode]);

                    return (
                        <div className="flex items-center gap-x-3">
                            <PhoneInput
                                defaultCountry={countryIso}
                                className={`mt-1 w-[200px] h-10 cursor-pointer  border-[1px] rounded-[8px]  outline-none px-3 bg-transparent placeholder:!text-sm disabled:bg-gray-200 ${
                                    errors && errors[name]
                                        ? "border-red-500 shadow-red-500"
                                        : "border-gray-300"
                                }`}
                                inputProps={{
                                    readOnly: true,
                                    disabled: true,
                                }}
                                inputClassName="!text-black !text-sm !font-medium !-mt-[2px] !px-4 !h-10 !w-20"
                                onChange={(value, meta) => {
                                    setCountryIso(meta.country.iso2),
                                        setPhoneCode(value);
                                }}
                                {...props}
                            />
                            <input
                                type="text"
                                onChange={(e) => setPhoneValue(e.target.value)}
                                value={phoneValue}
                                className={`mt-1 w-full h-10 text-sm font-normal border-[1px] rounded-[8px]  outline-none px-3 bg-transparent placeholder:!text-sm disabled:bg-gray-200 ${
                                    errors && errors[name]
                                        ? "border-red-500 shadow-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </div>
                    );
                }}
            />
            {errors && (
                <span className="text-red-500 text-xs h-4 font-light  block px-3 py-1">
                    {errors?.[name]?.message}
                </span>
            )}
        </div>
    );
}

export default FormPhoneInput;
