"use client";
import React from "react";
import GeneralInfo from "../steps/generalInfo";
import PropositionDeValeur from "../steps/valueProposition";
import Marche from "../steps/market";
import Avancement from "../steps/advancement";
import EquipeFondatrice from "../steps/team";
import Presentation from "../steps/presentation";
import Expectations from "../steps/expectations";
import Funding from "../steps/funding";

const step1Icon = (
    <img src="/icons/project/clipboard-list.svg" alt="icon" className="p-1" />
);
const step2Icon = (
    <img src="/icons/project/Frame.svg" alt="icon" className="p-1" />
);
const step3Icon = (
    <img src="/icons/project/chart-pie.svg" alt="icon" className="p-1" />
);
const step4Icon = (
    <img src="/icons/project/chart-dots-3.svg" alt="icon" className="p-1" />
);
const step5Icon = (
    <img src="/icons/project/users.svg" alt="icon" className="p-1" />
);
const step6Icon = (
    <img src="/icons/project/screen.svg" alt="icon" className="p-1" />
);
const step7Icon = (
    <img src="/icons/project/certificate.svg" alt="icon" className="p-1" />
);
export const steps = [
    { title: "Informations générales", content: GeneralInfo, icon: step1Icon },
    {
        title: "Proposition de Valeur",
        content: PropositionDeValeur,
        icon: step2Icon,
    },
    { title: "Marché", content: Marche, icon: step3Icon },
    { title: "Avancement", content: Avancement, icon: step4Icon },
    {
        title: "L'équipe fondatrice",
        content: EquipeFondatrice,
        icon: step5Icon,
    },
    { title: "Financement", content: Funding, icon: step6Icon },
    { title: "Présentation", content: Presentation, icon: step6Icon },
    { title: "Vos attentes", content: Expectations, icon: step7Icon },
];
