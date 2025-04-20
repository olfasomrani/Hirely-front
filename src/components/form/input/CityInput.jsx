import FormInput from "@/components/ui/form/FormInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const CityInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="city"
            label={t("city")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("cityRequired")),
                      }
                    : {}
            }
        />
    );
};


export default CityInput
