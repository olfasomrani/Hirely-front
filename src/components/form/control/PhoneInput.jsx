import FormPhoneInput from "@/components/ui/form/FormPhoneInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const PhoneInput = ({
    setValue,
    required,
    control,
    errors,
    setError,
    clearErrors,
}) => {
    const { t } = useTranslation("main");
    return (
        <FormPhoneInput
            name="phone"
            label={t("phone")}
            control={control}
            required={required}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("phoneRequired")),
                      }
                    : {}
            }
        />
    );
};

export default PhoneInput;
