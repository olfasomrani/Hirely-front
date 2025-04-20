import { useId, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const FormSelect = ({
    control,
    label,
    required,
    placeholder = "",
    rules,
    errors,
    name,
    isMulti = false,
    options,
    defaultValue,
    borderError,
    withClear = false,
    containerClassName = "",
    menuPlacement = "bottom",
    withoutErrorSpace = false,
    filterOption,
    ...props
}) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const id = useId();
    
    return (
        <div {...props} className={`relative w-full ${containerClassName}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-normal">
                    {label}
                    {required && <span className="text-red-600"> *</span>}
                </label>
            )}
            <div className="relative">
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => {
                        const { value, ...rest } = field;
                        const [__value, __setValue] = useState(false);
                        useEffect(() => {
                            if (options?.length !== 0) {
                                if (isMulti) {
                                    if (
                                        value?.length !== 0 &&
                                        value !== undefined &&
                                        value !== null &&
                                        typeof value?.[0] !== "object"
                                    ) {
                                        const opt = options.filter((c) =>
                                            value.includes(c.value)
                                        );
                                        __setValue(opt);
                                    } else if (
                                        value?.length !== 0 &&
                                        value !== undefined&&
                                        value !== null
                                    ) {
                                        __setValue(value);
                                    }
                                } else {
                                    if (typeof value !== "object") {
                                        __setValue(
                                            options.find(
                                                (c) => c.value === value
                                            )
                                        );
                                    } else {
                                        __setValue(value);
                                    }
                                }
                            }
                        }, [value, options]);
                        return (
                            <Select
                                {...rest}
                                value={__value}
                                isMulti={isMulti}
                                menuPlacement={menuPlacement}
                                inputValue={inputValue}
                                onInputChange={setInputValue}
                                className={`border-1 !min-h-10 text-sm w-full bg-white ${
                                    label ? "mt-1" : ""
                                }`}
                                placeholder={placeholder}
                                options={options}
                                noOptionsMessage={() => t("noOptions")}
                                filterOption={filterOption}
                                id={id}
                                styles={{
                                    menuList: (provided) => {
                                        return {
                                            ...provided,
                                            maxHeight: "150px",
                                            overflowY: "auto",
                                        };
                                    },
                                    placeholder: (value) => ({
                                        ...value,
                                        color: "black",
                                        fontSize: "0.75rem",
                                        lineHeight: "calc(1.25 / 0.875)",
                                        fontWeight: 500,
                                    }),
                                    control(base) {
                                        return {
                                            ...base,
                                            borderRadius: "8px",
                                            minHeight: "40px",
                                            borderColor:
                                                (errors && errors[name]) ||
                                                borderError
                                                    ? "#fb2c36"
                                                    : "#99a1af",
                                        };
                                    },
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isDisabled
                                            ? "#99a1af"
                                            : state.isSelected
                                            ? "#BC946B"
                                            : base.backgroundColor,
                                        color: state.isSelected
                                            ? "white"
                                            : "black",
                                        cursor: state.isDisabled
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: 1,
                                        fontWeight: 400,
                                        fontSize: "0.875rem",
                                    }),
                                }}
                                isClearable={withClear}
                            />
                        );
                    }}
                />
            </div>
            {!withoutErrorSpace && errors && (
                <span className="text-red-500 text-xs font-light h-4  block px-3 py-1">
                    {errors?.[name]?.message}
                </span>
            )}
        </div>
    );
};

export default FormSelect;
