import FormTextInput from "@/components/ui/form/FormTextInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const DescriptionProfilTextInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormTextInput
            name="description"
            rows={3}
            label={t("descriptionProfil")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(
                              t("descriptionProfilRequired")
                          ),
                      }
                    : {}
            }
        />
    );
};


export default DescriptionProfilTextInput
