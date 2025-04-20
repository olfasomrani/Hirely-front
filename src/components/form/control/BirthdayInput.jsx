import FormDateInput from "@/components/ui/form/FormDateInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const BirthdayInput = ({ required, control, errors, withLabel }) => {
    const { t } = useTranslation("main");
    return (
        <FormDateInput
            name="birthday"
            control={control}
            placeholder={!withLabel && t("birthday")}
            required={required}
            label={withLabel && t("birthday")}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("birthdayRequired")),
                      }
                    : {}
            }
        />
    );
};

export default BirthdayInput;
