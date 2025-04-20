"use client";
import React from "react";
import GeneralInfo from "./generalInfo";
import PropositionDeValeur from "./valueProposition";
import Marche from "./market";
import Avancement from "./advancement";
import EquipeFondatrice from "./team";
import Presentation from "./presentation";
import Expectations from "./expectations";
import Funding from "./funding";

const step1Icon = (
  <img src="/icons/project/clipboard-list.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step2Icon = (
  <img src="/icons/project/Frame.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step3Icon = (
  <img src="/icons/project/chart-pie.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step4Icon = (
  <img src="/icons/project/chart-dots-3.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step5Icon = (
  <img src="/icons/project/users.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step6Icon = (
  <img src="/icons/project/screen.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);
const step7Icon = (
  <img src="/icons/project/certificate.svg" alt="icon" className="w-6 h-6 p-[2px]" />
);

export const steps = [
  {
    title: "Informations Générales",
    content: <GeneralInfo />,
    icon: step1Icon,
  },
  {
    title: "Proposition de Valeur",
    content: <PropositionDeValeur />,
    icon: step2Icon,
  },
  { title: "Marché", content: <Marche />, icon: step3Icon },
  { title: "Avancement", content: <Avancement />, icon: step4Icon },
  {
    title: "L'équipe fondatrice",
    content: <EquipeFondatrice />,
    icon: step5Icon,
  },
  { title: "Financement", content: <Funding />, icon: step6Icon },
  { title: "Présentation de votre produit", content: <Presentation />, icon: step6Icon },
  { title: "Vos attentes", content: <Expectations />, icon: step7Icon },
];

