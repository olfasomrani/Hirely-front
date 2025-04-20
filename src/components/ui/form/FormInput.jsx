import React, { useId } from "react";
import Icon from "../preview/Icon";
import inputClear from "../../../../public/icons/arrows/inputClear.svg";

function FormInput({
    name,
    label,
    register,
    options = {},
    required,
    setValue,
    errors,
    withClear,
    containerClassName = "",
    ...props
}) {
    const id = useId();
    return (
        <div className={`relative w-full ${containerClassName}`}>
            <label htmlFor={id} className="text-sm font-normal">
                {label}
                {required && <span className="text-red-600"> *</span>}
            </label>
            <input
                {...props}
                {...register(name, options)}
                className={`mt-1 w-full h-10  border-[1px] rounded-[8px] text-sm font-normal outline-none px-3 bg-transparent placeholder:!text-sm disabled:bg-gray-200 ${
                    errors && errors[name]
                        ? "border-red-500 shadow-red-500"
                        : "border-gray-300"
                } ${props.className || ""}`}
                id={id}
                autoComplete="off"
            />
            {withClear && (
                <Icon
                    icon={inputClear}
                    size={18}
                    className="absolute end-3 bottom-[26px]"
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

export default FormInput;
