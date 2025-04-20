import FormSelect from "@/components/ui/form/FormSelect";
import StatusPersonelService from "@/services/statusPersonel/statusPersonel.service";
import { messageValidation } from "@/utils/formValidation";
import React, { useEffect ,useState} from "react";
import { useTranslation } from "react-i18next";

const PersonalStatusSelect = ({
    control,
    errors,
    required,
    withClear,
    menuPlacement = "bottom",
}) => {
    const { t } = useTranslation("main");
    const [personalStatusOptions, setPersonalStatusOptions] = useState([]);

    useEffect(() => {
        StatusPersonelService.getAllPersonalStatus()
            .then((res) => {
               setPersonalStatusOptions(res.data.perStatus.map(el=>({label: el.statusName ,value : el.idPersonalStatus})));
            })
            .catch((err) => {
                console.loog(err);
            });
    }, []);

    return (
        <FormSelect
            control={control}
            name="personalStatus"
            errors={errors}
            required={required}
            rules={
                required
                    ? {
                          required: messageValidation(
                              t("personalStatusRequired")
                          ),
                      }
                    : {}
            }
            options={personalStatusOptions}
            menuPlacement={menuPlacement}
            placeholder={t("personalStatusplc")}
            withClear={withClear}
        />
    );
};

export default PersonalStatusSelect;
