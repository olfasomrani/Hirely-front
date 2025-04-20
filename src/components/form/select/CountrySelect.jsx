import FormSelect from "@/components/ui/form/FormSelect";
import useCountryOptions from "@/hooks/useCountryOptions";
import { messageValidation } from "@/utils/formValidation";
import React from "react";
import { useTranslation } from "react-i18next";

const CountrySelect = ({
    name,
    control,
    errors,
    required,
    withClear,
    menuPlacement = "bottom",
    isMulti = false,
}) => {
    const { t } = useTranslation("main");
    const { countries } = useCountryOptions();
    const filterOption = (option, rawInput) => {
        const lowercasedInput = rawInput.toLowerCase();
        return option.data?.reference?.toLowerCase().includes(lowercasedInput);
    };
    return (
        <FormSelect
            control={control}
            name={name || isMulti ? "countries" : "country"}
            errors={errors}
            required={required}
            isMulti={isMulti}
            rules={
                required
                    ? {
                          required: messageValidation(t("countryRequired")),
                      }
                    : {}
            }
            options={countries}
            menuPlacement={menuPlacement}
            label={t("countryplc")}
            withClear={withClear}
            filterOption={filterOption}
        />
    );
};

export default CountrySelect;
