import React, { useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function InternationalPhone({
    control,
    name,
    rules,
    label,
    required,
    className,
    onChange,
}) {
    const [countryCode, setCountryCode] = useState("+33");

    return (
        <div
            className={`${className || ""} flex flex-col mb-4 relative w-full`}>
            <span className="font-semibold text-xs text-darkgrey mx-1 absolute top-0 left-4 bg-tw-white px-3 z-[2]">
                {label} {required && <span className="text-red-600">*</span>}
            </span>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange: fieldOnChange, value } }) => {
                    return (
                        <div className="flex items-center">
                            <PhoneInput
                                country={"fr"}
                                inputClass="border rounded-l-md focus:border-blue-500 bg-white p-2 border-grey"
                                buttonClass="border rounded-l-md"
                                placeholder=""
                                onChange={(value, countryData) => {
                                    const newCountryCode = `+${countryData.dialCode}`;
                                    setCountryCode(newCountryCode);
                                    fieldOnChange(value);
                                    if (onChange) {
                                        onChange(value);
                                    }
                                }}
                                style={{ width: "150px" }}
                            />
                            <input
                                type="text"
                                className="border rounded-md focus:border-blue-500 bg-white p-1 ml-2 w-full"
                                onChange={(e) => {
                                    const numValue = e.target.value;
                                    const fullPhoneNumber = numValue
                                        ? `${countryCode}${numValue}`
                                        : "";
                                    fieldOnChange(fullPhoneNumber);
                                    if (onChange) {
                                        onChange(fullPhoneNumber);
                                    }
                                }}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default InternationalPhone;
