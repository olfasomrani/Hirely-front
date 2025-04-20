import React from "react";
import { messageValidation } from "@/utils/formValidation";
import FormSelect from "@/components/ui/form/FormSelect";
import { useTranslation } from "react-i18next";
import useNationalityOptions from "@/hooks/useNationalityOptions";

const NationalitySelect = ({
    control,
    errors,
    required,
    withClear,
    menuPlacement = "bottom",
    isMulti = false,
    name = "nationality",
    civility = "man",
}) => {
    const { t } = useTranslation("main");
    const { nationalities } = useNationalityOptions(civility);
       const filterOption = (option, rawInput) => {
        const lowercasedInput = rawInput.toLowerCase();
        return option.data?.reference?.toLowerCase().includes(lowercasedInput);
    };
    return (
        <FormSelect
            control={control}
            name={name}
            errors={errors}
            required={required}
            isMulti={isMulti}
            rules={
                required
                    ? {
                          required: messageValidation(t("nationalityRequired")),
                      }
                    : {}
            }
            options={nationalities}
            menuPlacement={menuPlacement}
            label={t("nationalityplc")}
            withClear={withClear}
            filterOption={filterOption}
        />
    );
};

export default NationalitySelect;
