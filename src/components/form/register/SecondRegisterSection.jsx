import React from "react";
import FormPhotoInput from "../../ui/form/FormPhotoInput";
import CountrySelect from "../select/CountrySelect";
import NationalitySelect from "../select/NationalitySelect";
import CreatableEntrepriseSelect from "../select/CreatableEntrepriseSelect";
import DoubleColumnFormRow from "../layout/DoubleColumnFormRow";
import CityInput from "../input/CityInput";
import CodePostalInput from "../input/CodePostalInput";
import AddressInput from "../input/AddressInput";
import DescriptionProfilTextInput from "../text/DescriptionProfilTextInput";
import DescriptionWhatExpectTextInput from "../text/DescriptionWhatExpectTextInput";
import LinkedinInput from "../input/LinkedinInput";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

function SecondRegisterSection({
    formProps: {
        register,
        control,
        watch,
        clearErrors,
        formState: { errors },
        handleSubmit
    },
    onSubmit,
}) {
    const currentCivility = watch("civility");
    const {t} = useTranslation("main")
    return (
        <div className="w-full flex flex-col ps-3">
            <FormPhotoInput
                required
                control={control}
                errors={errors}
                clearErrors={clearErrors}
            />
            <CountrySelect required control={control} errors={errors} isMulti />
            <DoubleColumnFormRow>
                <NationalitySelect
                    required
                    control={control}
                    errors={errors}
                    civility={currentCivility === "madam" ? "woman" : "man"}
                />
                <AddressInput required register={register} errors={errors} />
            </DoubleColumnFormRow>
            <DoubleColumnFormRow>
                <CityInput required register={register} errors={errors} />
                <CodePostalInput required register={register} errors={errors} />
            </DoubleColumnFormRow>
            <LinkedinInput required register={register} errors={errors} />
            <CreatableEntrepriseSelect
                required
                control={control}
                errors={errors}
            />
            <DescriptionProfilTextInput register={register} errors={errors} />
            <DescriptionWhatExpectTextInput
                register={register}
                errors={errors}
            />
            <Button
                className="bg-custom-color border-custom-color text-white hover:bg-opacity-80 mt-4 !h-9 text-sm font-semibold w-full"
                onClick={handleSubmit(onSubmit)}>
                {t("submit")}
            </Button>
        </div>
    );
}

export default SecondRegisterSection;
