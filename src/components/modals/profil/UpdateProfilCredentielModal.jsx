import UpdateProfileForm from "@/components/form/profil/UpdateProfileForm";
import useAuth from "@/hooks/useAuth";
import UserService from "@/services/user/user.service";
import { formatInputDate } from "@/utils/helpers";
import { clearEmptyValues } from "@/utils/transformer/formCleaner";
import { Modal, Button } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const UpdateProfilCredentielModal = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;
    const { t } = useTranslation("main");
    const { updateUser } = useAuth();

    const formProps = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            civility: user.civility,
            birthday:user.birthday? new Date(user.birthday): undefined,
            phone: user.phone,
            countries: user.countries,
            nationality: user.nationality,
            address: user.address,
            city: user.city,
            postalCode: user.postalCode,
            linkedinLink: user.linkedinLink,
            description: user.description,
        },
        mode: "onChange",
    });
    const onSubmit = (data) => {
        const SubmitData = clearEmptyValues(data);
        UserService.updateProfileData(SubmitData)
            .then((res) => {
                updateUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    civility: res.data.civility,
                    birthday: res.data.birthday,
                    phone: res.data.phone,
                    countries: res.data.countries,
                    nationality: res.data.nationality,
                    address: res.data.address,
                    city: res.data.city,
                    postalCode: res.data.postalCode,
                    linkedinLink: res.data.linkedinLink,
                    description: res.data.description,
                });
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            className="p-1 tablet:p-3 !top-5 !w-full desktop:!w-[800px] !z-[9999]">
            <h2 className="text-2xl font-semibold text-center text-gray-700 my-4">
                {t("updateProfileTitle")}
            </h2>
            <FormProvider {...formProps}>
                <UpdateProfileForm formProps={formProps} user={user} />
                <div className="flex justify-between pt-2 px-1 tablet:px-3">
                    <Button onClick={onClose} className="min-w-[120px]">
                        {t("cancel")}
                    </Button>
                    <Button
                        type="primary"
                        onClick={formProps.handleSubmit(onSubmit)}
                        className="min-w-[120px]">
                        {t("submit")}
                    </Button>
                </div>
            </FormProvider>
        </Modal>
    );
};

export default UpdateProfilCredentielModal;
