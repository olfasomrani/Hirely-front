import FormInput from "@/components/ui/form/FormInput";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const AddressInput = ({ required, errors, register }) => {
    const { t } = useTranslation("main");
    return (
        <FormInput
            name="address"
            label={t("address")}
            register={register}
            required={required}
            errors={errors}
            options={
                required
                    ? {
                          required: messageValidation(t("addressRequired")),
                      }
                    : {}
            }
        />
    );
};

export default AddressInput
