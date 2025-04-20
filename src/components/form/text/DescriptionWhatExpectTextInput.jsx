import FormTextInput from "@/components/ui/form/FormTextInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const DescriptionWhatExpectTextInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormTextInput
            name="whatExpect"
            rows={4}
            label={t("whatExpect")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(
                              t("whatExpectRequired")
                          ),
                      }
                    : {}
            }
        />
    );
};

export default DescriptionWhatExpectTextInput
