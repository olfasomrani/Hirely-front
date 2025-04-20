import { Form, Checkbox, Radio, Input } from "antd";
import { useState, useEffect } from "react";

const { TextArea } = Input;

const options = [
    {
        label: "Mise en relation avec le réseau Professionnel",
        value: "Mise en relation avec le réseau Professionnel",
    },
    {
        label: "Assistance pour le Business Plan",
        value: "Assistance pour le Business Plan",
    },
    {
        label: "Retour d’expérience de notre Réseau D’Experts",
        value: "Retour d’expérience de notre Réseau D’Experts",
    },
    {
        label: "Accompagnement sur le terrain pour votre projet",
        value: "Accompagnement sur le terrain pour votre projet",
    },
    {
        label: "Avoir un diagnostic approfondi de votre projet",
        value: "Avoir un diagnostic approfondi de votre projet",
    },
    { label: "Accès à des financements", value: "Accès à des financements" },
    { label: "Formation", value: "Formation" },
    {
        label: "Conseils Juridiques et Fiscaux",
        value: "Conseils Juridiques et Fiscaux",
    },
    { label: "Autre (Précisez)", value: "Autre" },
];

const Expectations = ({ currentProject }) => {
    // Récupérer les attentes initiales
    const initialExpectations = currentProject?.project?.yourExpectFromCMDA
        ? currentProject.project.yourExpectFromCMDA
              .split(",")
              .map((item) => item.trim())
        : [];

    // Vérifier si "Autre" est sélectionné par défaut
    const [showOtherInput, setShowOtherInput] = useState(
        initialExpectations.includes("Autre")
    );

    useEffect(() => {
        // Mettre à jour showOtherInput si les données changent
        setShowOtherInput(initialExpectations.includes("Autre"));
    }, [currentProject]);

    const handleCheckboxChange = (checkedValues) => {
        setShowOtherInput(checkedValues.includes("Autre"));
    };

    return (
        <>
            <Form.Item
                name="yourExpectFromCMDA"
                initialValue={initialExpectations}
                label="Quelles sont vos attentes de l'équipe CMDA pour ce projet?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Veuillez sélectionner votre réponse!",
                    },
                ]}>
                <Checkbox.Group
                    options={options}
                    className="flex flex-col gap-y-2"
                    onChange={handleCheckboxChange}
                />
            </Form.Item>

            {showOtherInput && (
                <Form.Item
                    name="yourExpectFromCMDAOther"
                    label="Veuillez préciser"
                    initialValue={
                        currentProject?.project?.yourExpectFromCMDAOther || ""
                    }
                    className="font-bold"
                    rules={[
                        {
                            required: true,
                            message: "Veuillez préciser votre attente!",
                        },
                    ]}>
                    <Input placeholder="Précisez ici" className="font-bold" />
                </Form.Item>
            )}

            <Form.Item
                name="comments"
                initialValue={currentProject?.project?.comments}
                label="Avez-vous des commentaires ou suggestions supplémentaires concernant l'accompagnement des porteurs de projets ?"
                className="font-bold">
                <TextArea
                    placeholder="Écrivez vos suggestions ici..."
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                />
            </Form.Item>

            <Form.Item
                name="infoExactitude"
                initialValue={currentProject?.project?.infoExactitude}
                label="Je certifie l'exactitude des informations saisies?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Veuillez sélectionner votre réponse!",
                    },
                ]}>
                <Radio.Group>
                    <Radio value={true}>Je confirme</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="contactShare"
                initialValue={currentProject?.project?.contactShare}
                label="Est-ce que vous nous autorisez à partager vos coordonnées (téléphone, email, nom, prénom) dans le cadre d'une opportunité?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Veuillez sélectionner votre réponse!",
                    },
                ]}>
                <Radio.Group>
                    <Radio value={true}>Oui</Radio>
                    <Radio value={false}>Non</Radio>
                </Radio.Group>
            </Form.Item>
        </>
    );
};

export default Expectations;
