import React from "react";
import { useTranslation } from "react-i18next";

const DisabledChatInput = () => {
    const { t } = useTranslation("main");
    return <div className="px-3 pt-7 text-primary font-bold text-xs text-center shadow-center">{t("userNotAvailable")}</div>;
};

export default DisabledChatInput;
