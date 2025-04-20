import React from "react";
import DoubleColumnFormRow from "../layout/DoubleColumnFormRow";
import FirstNameInput from "../input/FirstNameInput";
import LastNameInput from "../input/LastNameInput";
import SexeRadio from "@/components/ui/form/SexeRadio";
import PhoneInput from "../control/PhoneInput";
import BirthdayInput from "../control/BirthdayInput";
import CountrySelect from "../select/CountrySelect";
import NationalitySelect from "../select/NationalitySelect";
import AddressInput from "../input/AddressInput";
import CityInput from "../input/CityInput";
import CodePostalInput from "../input/CodePostalInput";
import LinkedinInput from "../input/LinkedinInput";
import DescriptionProfilTextInput from "../text/DescriptionProfilTextInput";
import { useTranslation } from "react-i18next";

const UpdateProfileForm = ({
    formProps: {
        register,
        setValue,
        control,
        clearErrors,
        setError,
        watch,
        formState: { errors },
    },
    user,
}) => {
    const { t } = useTranslation("main");
    const currentCivility = watch("civility");

    // const validateEmailExistance = async (email) => {
    //     try {
    //         if (email) {
    //             const { data } = await AuthService.isEmailExist({ email });
    //             if (
    //                 data?.isExist &&
    //                 email &&
    //                 email?.trim() !== user.email?.trim()
    //             ) {
    //                 return t("emailExist");
    //             }
    //         }
    //         return true;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    return (
        <div className="w-full flex flex-col px-3">
            <DoubleColumnFormRow>
                <FirstNameInput register={register} required errors={errors} />
                <LastNameInput register={register} required errors={errors} />
            </DoubleColumnFormRow>
            <SexeRadio
                required
                setValue={setValue}
                watch={watch}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
            />
            <PhoneInput
                control={control}
                required
                setValue={setValue}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
            />
            <DoubleColumnFormRow>
                {/* <EmailInput
                    register={register}
                    required
                    errors={errors}
                    options={{ validate: validateEmailExistance }}
                    withoutPlc
                    /> */}
                <LinkedinInput required register={register} errors={errors} />
                <BirthdayInput
                    control={control}
                    required
                    errors={errors}
                    withLabel
                />
            </DoubleColumnFormRow>
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
            <DescriptionProfilTextInput register={register} errors={errors} />
        </div>
    );
};

export default UpdateProfileForm;
