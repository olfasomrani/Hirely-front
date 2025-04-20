import CreateEntrepriseModal from "@/components/modals/CreateEntrepriseModal";
import EntrepriseService from "@/services/entreprise/entreprise.service";
import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormSelect from "@/components/ui/form/FormSelect";
import { messageValidation } from "@/utils/formValidation";
import { Button } from "antd";

const CreatableEntrepriseSelect = ({
    name,
    control,
    errors,
    required,
    withClear,
    menuPlacement = "bottom",
    isMulti = false,
}) => {
    const { t } = useTranslation("main");
    const [Entreprises, setEntrprises] = useState([]);
    const [createCompanyModal, setCreateCompanyModal] = useState(false);
    const fieldName = name || isMulti ? "companies" : "company";

    const fetchData = useCallback(async () => {
        EntrepriseService.getAllEntreprises()
            .then((res) => {
                setEntrprises(
                    res.data?.map((e) => ({
                        value: e.idCompany,
                        label: e.companyName,
                    }))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <label className="text-sm font-normal">
                {t("companyLabel")}
                {required && <span className="text-red-600"> *</span>}
            </label>
            <div className="flex gap-x-3 items-start mt-1">
                <FormSelect
                    control={control}
                    name={fieldName}
                    errors={{}}
                    withoutErrorSpace
                    borderError={!!errors[fieldName]?.message}
                    required={required}
                    isMulti={isMulti}
                    rules={
                        required
                            ? {
                                  required: messageValidation(
                                      t("companyRequired")
                                  ),
                              }
                            : {}
                    }
                    options={Entreprises}
                    menuPlacement={menuPlacement}
                    withClear={withClear}
                />
                <Button
                    className="bg-custom-color border-custom-color text-white hover:bg-opacity-80 !h-10 text-sm font-semibold w-full"
                    onClick={() => setCreateCompanyModal(true)}>
                    {t("createCompany")}
                </Button>
            </div>
            {errors && (
                <span className="text-red-500 font-light text-xs h-4  block px-3 py-1">
                    {errors[fieldName]?.message}
                </span>
            )}
            <CreateEntrepriseModal
                isOpen={createCompanyModal}
                onClose={() => setCreateCompanyModal(false)}
                onSuccess={() => {
                    fetchData();
                }}
            />
        </div>
    );
};

export default CreatableEntrepriseSelect;
