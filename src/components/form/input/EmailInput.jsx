import React from "react";
import { useTranslation } from "react-i18next";
import FormInput from "../../ui/form/FormInput";
import {
    emailPatternValidation,
    messageValidation,
} from "@/utils/formValidation";

const EmailInput = ({
    withoutStar,
    withoutPlc,
    required,
    options = {},
    ...props
}) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="email"
            label={t("email")}
            placeholder={withoutPlc ? "" : t("emailplc")}
            required={!withoutStar && required}
            {...props}
            options={{
                ...(required
                    ? {
                          required: messageValidation(t("emailRequired")),
                      }
                    : {}),
                pattern: emailPatternValidation(t("emailInvalid")),
                ...options,
            }}
        />
    );
};

export default EmailInput;
