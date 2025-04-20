import React, { useEffect, useState } from "react";
import { Form, Input, Select, Radio } from "antd";
import { getAllActSectors } from "@/services/activitySectors";
import { getAllIndustryCats } from "@/services/industryCategories";
import { getAllTechnoTypes } from "@/services/technologyTypes";

const { Option } = Select;

export const marketOptions = [
    // { label: "B2B", value: "B2B", signification: "Business to Business" },
    // { label: "B2C", value: "B2C", signification: "Business to Consumer" },
    // {
    //     label: "B2B & B2C",
    //     value: "B2B & B2C",
    //     signification: "Business to Both B2B and B2C",
    // },
    // {
    //     label: "B2B2C",
    //     value: "B2B2C",
    //     signification: "Business to Business to Consumer",
    // },
    // { label: "B2G", value: "B2G", signification: "Business to Government" },
    {
        label: "B2E",
        value: "B2E",
        signification: "Business to Employee",
        description:
            "Entreprise offrant des services ou produits directement à ses employés (ex. avantages, formations).",
    },
    {
        label: "C2C",
        value: "C2C",
        signification: "Consumer to Consumer",
        description:
            "Transactions entre particuliers, souvent via des plateformes (ex. eBay, Le Bon Coin).",
    },
    {
        label: "C2B",
        value: "C2B",
        signification: "Consumer to Business",
        description:
            "Individus offrant des services ou contenus aux entreprises (ex. influenceurs, freelances).",
    },
    {
        label: "G2C",
        value: "G2C",
        signification: "Government to Consumer",
        description:
            "Services fournis par le gouvernement aux citoyens (ex. paiement des impôts en ligne).",
    },
    {
        label: "G2B",
        value: "G2B",
        signification: "Government to Business",
        description:
            "Interactions entre gouvernements et entreprises (ex. réglementation, délivrance de licences).",
    },
    {
        label: "G2G",
        value: "G2G",
        signification: "Government to Government",
        description:
            "Collaboration ou échanges entre différents gouvernements ou agences gouvernementales.",
    },
    {
        label: "B2S",
        value: "B2S",
        signification: "Business to School",
        description:
            "Entreprises ayant un impact direct sur la société (ex. projets sociaux ou environnementaux).",
    },
    {
        label: "B2P",
        value: "B2P",
        signification: "Business to Professional",
        description:
            "Transactions visant des professionnels indépendants ou des experts dans un domaine.",
    },
    {
        label: "P2P",
        value: "P2P",
        signification: "Peer-to-Peer",
        description:
            "Modèle où les utilisateurs partagent directement des ressources ou services (ex. Airbnb, Uber).",
    },
    {
        label: "D2C",
        value: "D2C",
        signification: "Direct to Consumer",
        description:
            "Entreprises vendant directement aux consommateurs sans intermédiaire (ex. marques sur leur propre site).",
    },
];

export const GeneralInfo = ({ currentProject }) => {
    console.log(currentProject);
    const [activitySectors, setActivitySectors] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [typeTechno, setTypeTechno] = useState([]);
    const [marketType, setMarketType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectors = await getAllActSectors();
                if (Array.isArray(sectors.actSector)) {
                    setActivitySectors(sectors.actSector);
                }
                const categories = await getAllIndustryCats();
                if (Array.isArray(categories.industryCat)) {
                    setCategorie(categories.industryCat);
                }
                const technoTypes = await getAllTechnoTypes();
                if (Array.isArray(technoTypes.technoTypes)) {
                    setTypeTechno(technoTypes.technoTypes);
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error
                );
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Form.Item
                name="title"
                label="Intitulé de votre projet"
                className="font-bold"
                initialValue={currentProject?.project?.title}
                rules={[
                    {
                        required: true,
                        message: "Veuillez mettre le nom de votre projet ici !",
                    },
                    {
                        min: 2,
                        max: 50,
                        message: "Le titre doit être entre 2 et 50 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "Le titre doit être une chaîne de caractères"
                                    )
                                );
                            }
                            const wordCount = value
                                ? value.trim().split(/\s+/).length
                                : 0;
                            if (wordCount > 5) {
                                return Promise.reject(
                                    new Error(
                                        "Le titre ne doit pas dépasser 5 mots"
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input
                    placeholder="Nom de projet"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                />
            </Form.Item>

            <Form.Item
                name="industryCategories"
                initialValue={
                    currentProject?.project?.industryCategories?.map(
                        (item) => item.idIndustryCategory
                    ) || []
                }
                label="Dans quelle industrie catégorisez-vous votre projet?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Sélectionnez votre industrie!",
                    },
                ]}>
                <Select
                    placeholder="Sélectionnez votre catégorie"
                    mode="multiple"
                    className="border-2 border-black rounded-[8px] font-normal">
                    {categorie.map((cat) => (
                        <Option
                            key={cat.idIndustryCat}
                            value={cat.idIndustryCategory}>
                            {cat.industryCatName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="activitySectors"
                initialValue={
                    currentProject?.project?.activitySectors?.map(
                        (item) => item.idActivitySector
                    ) || []
                }
                label="Dans quel secteur d'activité catégorisez-vous votre projet?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Sélectionnez votre secteur d'activité!",
                    },
                ]}>
                <Select
                    placeholder="Sélectionnez votre secteur"
                    mode="multiple"
                    className="border-2 border-black rounded-[8px] font-normal">
                    {activitySectors.map((sector) => (
                        <Option
                            key={sector.idActivitySector}
                            value={sector.idActivitySector}>
                            {sector.sectorName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="technologyTypes"
                initialValue={
                    Array.isArray(currentProject?.project?.technologyTypes)
                        ? currentProject?.project?.technologyTypes.map(
                              (type) => type.idTechnologyType
                          )
                        : []
                }
                label="Quel type de technologie utilisez-vous dans votre projet?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Sélectionnez votre technologie!",
                    },
                ]}>
                <Select
                    placeholder="Sélectionnez votre technologie"
                    mode="multiple"
                    className="border-2 border-black rounded-[8px] font-normal !placeholder-primary">
                    {typeTechno.map((techno) => (
                        <Option
                            key={techno.idTechnoType}
                            value={techno.idTechnologyType}>
                            {techno.technologyName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="marketType"
                initialValue={currentProject?.project?.marketType}
                label="Pour quel type de marché votre produit est-il destiné?"
                className="font-bold"
                rules={[
                    {
                        required: true,
                        message: "Sélectionnez votre type de marché!",
                    },
                ]}>
                <Radio.Group
                    value={currentProject?.project?.marketType}
                    onChange={(e) => setMarketType(e.target.value)}
                    className="w-full">
                    <table className="text-left w-full !text-black !text-sm">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 !text-sm">
                                    Sélection
                                </th>
                                <th className="border border-gray-300 px-4 py-2 !text-sm">
                                    Type de marché
                                </th>
                                <th className="border border-gray-300 px-4 py-2 !text-sm">
                                    Signification
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {marketOptions.map((option) => (
                                <tr key={option.value}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Radio value={option.value} />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {option.label}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {option.signification}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {option.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Radio.Group>
            </Form.Item>
        </>
    );
};

export default GeneralInfo;
