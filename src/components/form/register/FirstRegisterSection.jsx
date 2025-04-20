import SexeRadio from "@/components/ui/form/SexeRadio";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import AuthService from "@/services/auth/auth.service";
import FirstNameInput from "../input/FirstNameInput";
import LastNameInput from "../input/LastNameInput";
import PasswordInput from "../input/PasswordInput";
import EmailInput from "../input/EmailInput";
import PhoneInput from "../control/PhoneInput";
import BirthdayInput from "../control/BirthdayInput";
import PersonalStatusSelect from "../select/PersonalStatusSelect";
import DoubleColumnFormRow from "../layout/DoubleColumnFormRow";
import { escapeRegex } from "@/utils/formValidation";

const FirstRegisterSection = ({
    formProps: {
        register,
        setValue,
        control,
        clearErrors,
        setError,
        watch,
        formState: { errors },
    },
    onSubmit,
}) => {
    const { t } = useTranslation("main");
    const validateEmailExistance = async (email) => {
        try {
            if (email) {
                const { data } = await AuthService.isEmailExist({ email });
                if (data?.isExist) {
                    return t("emailExist");
                }
            }
            return true;
        } catch (err) {
            console.log(err);
        }
    };
    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const validatePassword = (password) => {
        if (password && (firstName || lastName)) {
            const lowerPassword = password.toLowerCase();
            const lowerFirstName = firstName?.toLowerCase();
            const lowerLastName = lastName?.toLowerCase();

            if (lowerFirstName && (new RegExp(escapeRegex(lowerFirstName), "i")).test(lowerPassword)) {
            return t("passwordShouldNotContainFirstName");
            }

            if (lowerLastName && (new RegExp(escapeRegex(lowerLastName), "i")).test(lowerPassword)) {
            return t("passwordShouldNotContainLastName");
            }
        }
        return true;
    }
    return (
        <div className="w-full flex flex-col ps-3">
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
            <EmailInput
                register={register}
                required
                errors={errors}
                options={{ validate: validateEmailExistance }}
                withoutPlc
            />
            <PasswordInput
                register={register}
                errors={errors}
                noPlc
                required
                options={{ validate: validatePassword }}
            />
            <PhoneInput
                control={control}
                required
                setValue={setValue}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
            />
            <DoubleColumnFormRow className="mt-3">
                <BirthdayInput control={control} required errors={errors} />
                <PersonalStatusSelect
                    control={control}
                    required
                    setValue={setValue}
                    errors={errors}
                    menuPlacement="top"
                />
            </DoubleColumnFormRow>
            <Button
                className="bg-custom-color border-custom-color text-white hover:bg-opacity-80 mt-4 !h-9 text-sm font-semibold w-full"
                onClick={onSubmit}>
                {t("next")}
            </Button>
        </div>
    );
};

export default FirstRegisterSection;
