import { Form } from "antd";
import React from "react";
import FormStepTitle from "./FormStepTitle";

const FormSteps = ({ steps, currentStep }) => {
    return (
        <div className="flex bg-gray-300 justify-evenly p-1 desktop:p-2">
            {steps.map((stp, index) => {
                const isActive = index === currentStep;
                // const isCompleted = index < currentStep;
                return (
                    <div
                        className={`grid grid-cols-[32px_1fr] items-center justify-center p-2 desktop:!py-1 gap-x-2 rounded-lg ${
                            isActive ? "bg-primary" : "bg-transparent"
                        }`}
                        key={index}
                        title={stp.title}>
                        <div
                            className={`rounded-full border-[1px] w-8 h-8 flex items-center justify-center ${
                                isActive ? "border-black" : "border-primary"
                            } bg-black`}>
                            {stp.icon}
                        </div>
                        <FormStepTitle>{stp.title}</FormStepTitle>
                    </div>
                );
            })}
        </div>
    );
};

export default FormSteps;