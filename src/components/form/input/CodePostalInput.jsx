import FormInput from "@/components/ui/form/FormInput";
import { codePostalPatternValidation, messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const CodePostalInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="postalCode"
            label={t("postalCode")}
            register={register}
            required={required}
            errors={errors}
            options={{
                ...(required
                    ? {
                          required: messageValidation(t("postalCodeRequired")),
                      }
                    : {}),
                pattern: codePostalPatternValidation(t("postalCodeInvalid")),
            }}
        />
    );
};

export default CodePostalInput;
