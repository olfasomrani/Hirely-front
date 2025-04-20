import React, { useId, useRef } from "react";
import Icon from "../preview/Icon";
import inputClear from "../../../../public/icons/arrows/inputClear.svg";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { fr, enUS, ar } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

function FormDateInput({
    name,
    label,
    control,
    options = {},
    required,
    setValue,
    errors,
    withClear,
    containerClassName = "",
    className,
    placeholder,
}) {
    const id = useId();
    const { i18n } = useTranslation();
    const localeMap = {
        fr: fr,
        en: enUS,
        ar: ar,
    };
    return (
        <div className={`relative w-full flex flex-col ${containerClassName}`}>
            {label && (
                <label htmlFor={id} className="">
                    {label}
                    {required && <span className="text-red-600"> *</span>}
                </label>
            )}
            <CiCalendar
                size={24}
                className={`absolute ${label ? "!top-8" : "!top-2"} !end-2`}
            />
            <Controller
                control={control}
                name={name}
                rules={options}
                render={({ field }) => {
                    return (
                        <ReactDatePicker
                            {...field}
                            selected={
                                field.value ? new Date(field.value) : null
                            }
                            onChange={(date) => field.onChange(date)}
                            adjustDateOnChange
                            yearDropdownItemNumber={100}
                            dateFormat="dd-MM-yyyy"
                            locale={localeMap[i18n.language] || enUS}
                            className={`${
                                label ? "mt-1" : "mt-0"
                            } w-full h-10  border-[1px] rounded-[8px] cursor-pointer !text-sm outline-none px-3 bg-transparent placeholder:!text-sm placeholder:text-black placeholder:font-medium disabled:bg-gray-200 ${
                                errors && errors[name]
                                    ? "border-red-500 shadow-red-500"
                                    : "border-gray-400"
                            } ${className || ""}`}
                            placeholderText={placeholder}
                            id={id}
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    );
                }}
            />
            {withClear && (
                <Icon
                    icon={inputClear}
                    size={18}
                    className="absolute end-7 bottom-[26px]"
                    onClick={() => {
                        setValue?.(name, "");
                    }}
                />
            )}
            {errors && (
                <span className="text-red-500 font-light text-xs h-4  block px-3 py-1">
                    {errors?.[name]?.message}
                </span>
            )}
        </div>
    );
}

export default FormDateInput;
