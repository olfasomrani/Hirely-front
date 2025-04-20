import FormInput from "@/components/ui/form/FormInput";
import { linkedinLinkPattern, messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const LinkedinInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="linkedinLink"
            label={t("linkedinLink")}
            register={register}
            required={required}
            errors={errors}
            options={{
                ...(required
                    ? {
                          required: messageValidation(
                              t("linkedinLinkRequired")
                          ),
                      }
                    : {}),
                pattern: linkedinLinkPattern(t("linkedinLinkPattern")),
            }}
        />
    );
};

export default LinkedinInput

