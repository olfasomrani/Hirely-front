import EntrepriseService from "@/services/entreprise/entreprise.service";
import { Modal ,Input} from "antd";
import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";

const CreateEntrepriseModal = ({ isOpen, onClose, onSuccess }) => {
    if (!isOpen) return null;
    const { t } = useTranslation("main");
    const [newCompanyName, setNewCompanyName] = useState("");
    const id = useId();
    const handleSubmit = () => {
        EntrepriseService.createEntreprise({ companyName: newCompanyName })
            .then((res) => {
                onSuccess(res.data?.company);
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Modal
            title={t("createCompanyModalTitle")}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={onClose}
            okText={t("add")}
            cancelText={t("cancel")}
            okButtonProps={{
                style: {
                    backgroundColor: "#BC946B",
                    color: "#fff",
                },
            }}>
            <div className="w-full mb-4">
                <label htmlFor={id}>{t("companyName")}</label>
                <Input
                    value={newCompanyName}
                    id={id}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full"
                />
            </div>
        </Modal>
    );
};

export default CreateEntrepriseModal;
