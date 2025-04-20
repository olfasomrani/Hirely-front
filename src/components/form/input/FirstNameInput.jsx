import FormInput from "@/components/ui/form/FormInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const FirstNameInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="firstName"
            label={t("firstName")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("firstNameRequired")),
                      }
                    : {}
            }
        />
    );
};

export default FirstNameInput;
