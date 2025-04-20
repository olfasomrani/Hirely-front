import FormInput from "@/components/ui/form/FormInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const LastNameInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="lastName"
            label={t("lastName")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("lastNameRequired")),
                      }
                    : {}
            }
        />
    );
};

export default LastNameInput;
