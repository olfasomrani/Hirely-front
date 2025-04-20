"use client";
import React, { useState, useEffect } from "react";
import { Form, Button,  notification } from "antd";
import { updateProject, getProjectById } from "@/services/projectUsers";
import { steps } from "../../../../components/project/stepsUpdate/steps";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import FormSteps from "@/components/project/steps/FormSteps";


function ProjectForm() {
    const { user } = useAuth();
    const router = useRouter();
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        status: "",
        marketType: "",
        user: null,
    });

    useEffect(() => {
        const projectId = localStorage.getItem("selectedProjectId");
        if (projectId) {
            setSelectedProjectId(projectId);
            fetchProjectDetails(projectId);
        }
    }, []);

    const fetchProjectDetails = async (projectId) => {
        try {
            const project = await getProjectById(projectId);
            if (project) {
                setCurrentProject(project);
                setFormData((prevData) => ({
                    ...prevData,
                    ...project,
                }));
            } else {
                notification.error({
                    message: "Erreur",
                    description: "Le projet n'a pas été trouvé.",
                    duration: 0,
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du projet", error);
            notification.error({
                message: "Erreur",
                description: "La récupération des détails du projet a échoué.",
                duration: 0,
            });
        }
    };

    useEffect(() => {
        if (user?.idUser) {
            setFormData((prevData) => ({
                ...prevData,
                user: user.idUser,
            }));
        }
    }, [user]);
    const handleMenuReturn = () => router.push("/admin/projets");
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const handleFormChange = (changedValues) => {
        setFormData((prevData) => ({
            ...prevData,
            ...changedValues,
        }));
    };
    const next = () => setCurrentStep(currentStep + 1);
    const prev = () => setCurrentStep(currentStep - 1);
    const handleSubmit = async () => {
        try {
            const cleanedFormData = {
                title: formData.title || currentProject?.title,
                status: formData.status || currentProject?.status,
                marketType: formData.marketType || currentProject?.marketType,
                description:
                    formData.description || currentProject?.description,
                problemAddressing:
                    formData.problemAddressing ||
                    currentProject?.problemAddressing,
                solutionProvided:
                    formData.solutionProvided ||
                    currentProject?.solutionProvided,
                innovativeSolution:
                    formData.innovativeSolution ||
                    currentProject?.innovativeSolution,
                competitors:
                    formData.competitors || currentProject?.competitors,
                solutionFactors:
                    formData.solutionFactors || currentProject?.solutionFactors,
                businessModel:
                    formData.businessModel || currentProject?.businessModel,
                growthPotential:
                    formData.growthPotential || currentProject?.growthPotential,
                // youtubeVideoDemoLink: formData.youtubeVideoDemoLink || currentProject?.youtubeVideoDemoLink,
                link: formData.link || currentProject?.link,
                youtubeVideoLink:
                    formData.youtubeVideoLink ||
                    currentProject?.youtubeVideoLink,
                userNumberAtteint:
                    formData.userNumberAtteint ||
                    currentProject?.userNumberAtteint,
                timeSpentProjet:
                    formData.timeSpentProjet || currentProject?.timeSpentProjet,
                targetMarketShare:
                    formData.targetMarketShare ||
                    currentProject?.targetMarketShare,
                programParticipate:
                    formData.programParticipate ||
                    currentProject?.programParticipate,
                marketSize: formData.marketSize || currentProject?.marketSize,
                workedOnOtherProjectTogether:
                    formData.workedOnOtherProjectTogether ||
                    currentProject?.workedOnOtherProjectTogether,
                launchedStartupPreviously:
                    formData.launchedStartupPreviously ||
                    currentProject?.launchedStartupPreviously,
                infoExactitude:
                    formData.infoExactitude || currentProject?.infoExactitude,
                foundingTeamDescription:
                    formData.foundingTeamDescription ||
                    currentProject?.foundingTeamDescription,
                everFieldPatents:
                    formData.everFieldPatents ||
                    currentProject?.everFieldPatents,
                targetMarket:
                    formData.targetMarket || currentProject?.targetMarket,
                user: formData.memberIdUser,
                activitySectors:
                    formData.activitySectors || currentProject?.activitySectors,
                industryCategories:
                    formData.industryCategories ||
                    currentProject?.industryCategories,
                technologyTypes:
                    formData.technologyTypes || currentProject?.technologyTypes,
                yourExpectFromCMDA:
                    formData.yourExpectFromCMDA ||
                    currentProject?.yourExpectFromCMDA,
                // acceptLabelStartup:
                //   formData.acceptLabelStartup || currentProject?.acceptLabelStartup,
                contactShare:
                    formData.contactShare || currentProject?.contactShare,
                entrepreneurshipAward:
                    formData.entrepreneurshipAward ||
                    currentProject?.entrepreneurshipAward,
                developmentStage:
                    formData.developmentStage ||
                    currentProject?.developmentStage,
                coufoundersNumber:
                    formData.coufoundersNumber ||
                    currentProject?.coufoundersNumber,
                currentTeamExecutedProject:
                    formData.currentTeamExecutedProject ||
                    currentProject?.currentTeamExecutedProject,
            };


            if (selectedProjectId) {
                const result = await updateProject(
                    selectedProjectId,
                    cleanedFormData
                );
                notification.success({
                    message: "Projet mis à jour avec succès",
                    description: "Votre projet a été mis à jour avec succès.",
                });
            }
            router.push("/admin/projets");
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour du projet",
                error.response?.data || error
            );
        }
    };
    const Component = steps[currentStep].content;
    return (
        <div className="flex justify-center">
            <div className="w-full bg-white rounded-md">
                <FormSteps currentStep={currentStep} steps={steps} />

                <Form
                    form={form}
                    layout="vertical"
                    className="p-6  w-[90%]"
                    onValuesChange={handleFormChange}
                    onFinish={handleSubmit}>
                    <div className="w-[50%]">
                        {currentProject && (
                            <Component
                                currentProject={currentProject}
                                form={form}
                            />
                        )}
                    </div>
                    <div className="steps-action mt-4 flex justify-end">
                        {currentStep === 0 && (
                            <Button
                                className="w-[256px] h-[50px] mr-[7px] border-primary text-primary"
                                onClick={handleMenuReturn}>
                                Précédent
                            </Button>
                        )}
                        {currentStep > 0 && (
                            <Button
                                className="w-[256px] h-[50px] mr-[7px] border-primary text-primary"
                                onClick={prev}>
                                Précédent
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button
                                className="w-[256px] h-[50px] bg-primary text-white"
                                htmlType="submit">
                                {selectedProjectId
                                    ? "Mettre à jour"
                                    : "Valider"}
                            </Button>
                        )}
                        {currentStep < steps.length - 1 && (
                            <Button
                                className="w-[256px] h-[50px] bg-primary text-white"
                                onClick={next}>
                                Suivant
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ProjectForm;
