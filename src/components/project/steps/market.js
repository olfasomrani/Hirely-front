import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import countriesData from "../../../../public/data/countries.json";

const { Option } = Select;

export const Market = ({ form, currentProject }) => {
    const [fields, setFields] = useState([{ key: Date.now() }]);
    const [availableCountries, setAvailableCountries] = useState([]);
    useEffect(() => {
        if (
            currentProject?.project?.marketings &&
            currentProject.project.marketings.length > 0
        ) {
            const initialFields = currentProject.project.marketings.map(
                (marketing, index) => ({
                    key: index,
                    target: marketing?.target,
                    country: marketing?.country,
                    year: marketing?.year,
                    marketType: marketing?.marketType,
                })
            );
            if (!form.getFieldValue("marketings")) {
                setFields(initialFields);
            } else {
                setFields(form.getFieldValue("marketings"));
            }
        } else {
            setFields([{ key: Date.now() }]);
        }
    }, [currentProject]);

    const addField = () => {
        setFields([...fields, { key: Date.now() }]);
    };

    const removeField = (index) => {
        const newFields = fields.filter((_, idx) => idx !== index);
        setFields(newFields);

        form.setFieldsValue({
            marketings: newFields.map((field) => ({
                target: field.target,
                country: field.country,
                year: field.year,
                marketType: field.marketType,
            })),
        });
    };
    useEffect(() => {
        const sortedCountries = countriesData.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setAvailableCountries(sortedCountries);
    }, []);
    return (
        <>
            <Form.Item
                label="Quel est votre marché cible ?"
                name="targetMarket"
                className="font-bold "
                initialValue={currentProject?.project?.targetMarket}
                rules={[
                    { required: true, message: "Mettez votre marché cible !" },
                    {
                        min: 2,
                        max: 300,
                        message:
                            "Votre marché cible doit être entre 2 et 300 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La réponse doit être une chaîne de caractères."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input.TextArea
                    placeholder="Décrivez votre marché cible"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                    rows={4}
                />
            </Form.Item>
            <div name="markets">
                {fields?.map((field, index) => (
                    <div
                        key={field?.key}
                        className="grid-col-2 lg:grid grid-cols-7 gap-2">
                        <Form.Item
                            label="Cible"
                            initialValue={field?.target}
                            className="font-bold col-span-2"
                            name={["marketings", index, "target"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Veuillez entrer la cible !",
                                },
                            ]}>
                            <Input
                                placeholder="Entrez la cible"
                                className="border-2 border-black rounded-[8px] font-normal !placeholder-primary"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Pays"
                            className="font-bold"
                            initialValue={field?.country}
                            name={["marketings", index, "country"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Veuillez sélectionner un pays !",
                                },
                            ]}>
                            <Select
                                showSearch
                                defaultValue={field?.country}
                                placeholder="sélectionner un pays"
                                className="border-2 border-black rounded-[8px] font-normal"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }>
                                {availableCountries.map((country) => (
                                    <Option
                                        key={country.id}
                                        value={country.name}>
                                        {country.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Année"
                            name={["marketings", index, "year"]}
                            className="font-bold"
                            initialValue={field?.year}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Veuillez sélectionner une année !",
                                },
                            ]}>
                            <Select
                                defaultValue={field?.year}
                                placeholder="Sélectionnez une année"
                                className="border-2 border-black rounded-[8px] font-normal">
                                {Array.from(
                                    { length: 2050 - 2025 + 1 },
                                    (_, i) => {
                                        const year = 2025 + i;
                                        return (
                                            <Option key={year} value={year}>
                                                {year}
                                            </Option>
                                        );
                                    }
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Type de marché"
                            className="font-bold col-span-2"
                            name={["marketings", index, "marketType"]}
                            initialValue={field?.marketType}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Veuillez sélectionner un type de marché !",
                                },
                            ]}>
                            <Select
                                defaultValue={field?.marketType}
                                placeholder="Sélectionnez un type de marché"
                                className="border-2 border-black rounded-[8px] font-normal">
                                <Option value="B2B">
                                    Business to Business
                                </Option>
                                <Option value="B2C">
                                    Business to Consumer
                                </Option>
                                <Option value="B2B & B2C">
                                    Business to Both B2B and B2C
                                </Option>
                                <Option value="B2B2C">
                                    Business to Business to Consumer
                                </Option>
                                <Option value="B2G">
                                    Business to Government
                                </Option>
                                <Option value="B2E">
                                    Business to Employee
                                </Option>
                                <Option value="C2C">
                                    Consumer to Consumer
                                </Option>
                                <Option value="C2B">
                                    Consumer to Business
                                </Option>
                                <Option value="G2B">
                                    Government to Business
                                </Option>
                                <Option value="G2G">
                                    Government to Government
                                </Option>
                                <Option value="B2S">Business to School</Option>
                                <Option value="B2P">
                                    Business to Professional
                                </Option>
                                <Option value="G2C">
                                    Government to Consumer
                                </Option>
                                <Option value="D2C">Direct to Consumer</Option>
                            </Select>
                        </Form.Item>
                        <Button
                            className="mb-4 lg:mt-[29px]"
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeField(index)}
                        />
                    </div>
                ))}
            </div>
            <Button
                className="border-primary text-primary mb-4"
                icon={<PlusOutlined className="text-primary" />}
                onClick={addField}>
                Ajouter un marché
            </Button>

            {/* Other Fields */}
            <Form.Item
                label="Taille du marché"
                className="font-bold"
                initialValue={currentProject?.project?.marketSize}
                name="marketSize"
                rules={[
                    {
                        required: true,
                        message: "Veuillez entrer la taille du marché !",
                    },
                    {
                        min: 2,
                        max: 300,
                        message:
                            "Taille du marché doit être entre 2 et 300 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La reponse doit être une chaîne de caractères."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input.TextArea
                    placeholder="Décrivez la taille du marché"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                label="Part de marché cible"
                className="font-bold"
                initialValue={currentProject?.project?.targetMarketShare}
                name="targetMarketShare"
                rules={[
                    {
                        required: true,
                        message: "Veuillez entrer la part de marché cible !",
                    },
                    {
                        min: 2,
                        max: 300,
                        message:
                            "Votre part de marché cible doit être entre 2 et 300 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La réponse doit être exprimée en pourcentage."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input.TextArea
                    placeholder="Décrivez la part de marché cible"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                label="Stratégie de croissance"
                className="font-bold"
                initialValue={currentProject?.project?.growthStrategy}
                name="growthStrategy"
                rules={[
                    {
                        required: true,
                        message: "Veuillez entrer la stratégie de croissance !",
                    },
                    {
                        min: 2,
                        max: 300,
                        message:
                            "Votre stratégie de croissance doit être entre 2 et 300 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La réponse doit être une chaîne de caractères."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input.TextArea
                    placeholder="Décrivez votre stratégie de croissance"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                label="Quel est le nombre d'utilisateurs que vous avez aujourd'hui? quelle est votre projection sur 3 ans"
                className="font-bold"
                initialValue={currentProject?.project?.userNumberAtteint}
                name="userNumberAtteint"
                rules={[
                    {
                        required: true,
                        message: "Veuillez entrer le nombre d'utilisateurs !",
                    },
                    {
                        min: 2,
                        max: 300,
                        message:
                            "Le nombre d'utilisateurs et la stratégie de croissance doit être entre 2 et 300 caractères.",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La réponse doit être une chaîne de caractères sous la forme : (nombre actuel, nombre projeté sur 3 ans)."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Input.TextArea
                    placeholder="Décrivez le nombre d'utilisateurs actuels et la projection sur 3 ans"
                    className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                label="Stade de développement"
                className="font-bold"
                initialValue={currentProject?.project?.developmentStage}
                name="developmentStage"
                rules={[
                    {
                        required: true,
                        message: "Sélectionnez votre stade de développement !",
                    },
                    {
                        validator: (_, value) => {
                            if (value && /^\d+$/.test(value)) {
                                return Promise.reject(
                                    new Error(
                                        "La réponse doit être une chaîne de caractères."
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}>
                <Select
                    placeholder="Sélectionnez le stade de développement"
                    className="border-2 border-black rounded-[8px] font-normal !placeholder-primary">
                    <Option value="idea">Idée</Option>
                    <Option value="prototype">Prototype</Option>
                    <Option value="mvp">MVP</Option>
                    <Option value="earlySales">Early Sales</Option>
                    <Option value="growth">Growth</Option>
                </Select>
            </Form.Item>
        </>
    );
};

export default Market;
