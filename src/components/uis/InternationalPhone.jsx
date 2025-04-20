import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function InternationalPhone({
  control,
  name,
  rules,
  label,
  required,
  placeholder,
  className,
  errors,
}) {
  return (
    <div className={`${className || ""} flex flex-col mb-4 relative w-full`}>
      <span className="font-semibold text-xs text-darkgrey mx-1 absolute top-0 left-4 bg-tw-white dark:bg-bgdark px-3 z-[2] ">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <PhoneInput
            country={"fr"}
            inputClass={`border rounded-md w-full focus:border-blue-500 bg-white p-2 dark:bg-bgdark dark:text-white ${
              errors?.[name] ? "border-red-600" : "border-grey"
            }`}
            placeholder={placeholder}
            onChange={(value) => field.onChange(value)}
            value={field.value}
            isValid={errors?.[name] ? false : true}
          />
        )}
      />
      {errors?.[name] && (
        <span className="text-[10px] text-red-600 font-semibold mx-1 h-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default InternationalPhone;
