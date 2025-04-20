import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllCompanies } from "@/services/Company";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import countriesData from "../../../public/data/countries.json";

const DirectorySearch = ({
    onSearch,
    searchTerm,
    setSearchTerm,
    selectedPays,
    setSelectedPays,
    selectedEntreprise,
    setSelectedEntreprise,
}) => {
    const [pays, setPays] = useState([]);
    const [filteredPays, setFilteredPays] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [filteredEntreprises, setFilteredEntreprises] = useState([]);

    useEffect(() => {
        // Charger les pays à partir du fichier JSON
        const paysData = countriesData
            .map((pays) => ({
                label: pays.name,
                value: pays.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

        setPays(paysData);
        setFilteredPays(paysData);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companys = await getAllCompanies();
                if (Array.isArray(companys)) {
                    setEntreprises(companys);
                    setFilteredEntreprises(companys);
                } else {
                    console.error(
                        "Les données de companies ne sont pas sous forme de tableau :",
                        companys
                    );
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

    // Filtrage des pays
    const handlePaysSearch = (input) => {
        const filtered = pays.filter((pays) =>
            pays.label.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredPays(filtered);
    };

    const handlePaysSelect = (selectedPays) => {
        setSelectedPays(selectedPays);
        if (selectedPays) {
            const filtered = entreprises.filter(
                (entreprise) => entreprise.countryName === selectedPays.label
            );
            setFilteredEntreprises(filtered);
        } else {
            setFilteredEntreprises(entreprises);
        }
    };
    const handleEntrepriseSelect = (value) => {
        const selectedCompany = entreprises.find(
            (entreprise) => entreprise.idCompany === value
        );
        setSelectedEntreprise(selectedCompany);
    };
    const handleDeselectPays = () => {
        setSelectedPays(null);
        setFilteredEntreprises(entreprises);
    };
    const handleDeselectEntreprise = () => {
        setSelectedEntreprise(null);
    };
    const filterCompanies = (input, option) => {
        return option.children.toLowerCase().includes(input.toLowerCase());
    };

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="p-0 rounded-lg mb-4 bg-white">
            <div className="flex justify-between items-center mb-4 md:flex-row flex-col">
                <CustomInput
                    placeholder="Rechercher par nom"
                    value={searchTerm}
                    onChange={(e) => handleSearchTermChange(e.target.value)}
                />
                <div className="gap-6 flex md:flex-row flex-col">
                    <CustomSelect
                        icon="/icons/company/office-building.svg"
                        className="w-full"
                        onChange={handleEntrepriseSelect}
                        value={
                            selectedEntreprise
                                ? selectedEntreprise.idCompany
                                : undefined
                        }
                        options={[
                            {
                                label: "Aucune entreprise sélectionnée",
                                value: "",
                            },
                            ...filteredEntreprises.map((com) => ({
                                label: com.companyName,
                                value: com.idCompany,
                            })),
                        ]}
                        filterOption={filterCompanies}
                        placeholder="Sélectionnez une entreprise"
                        onClear={handleDeselectEntreprise}
                    />
                    <CustomSelect
                        icon="/icons/company/office-building.svg"
                        options={[
                            { label: "Aucun pays sélectionné", value: "" },
                            ...filteredPays,
                        ]}
                        r
                        value={selectedPays ? selectedPays.value : undefined}
                        onChange={handlePaysSelect}
                        label="Pays"
                        placeholder="Sélectionnez un pays"
                        onSearch={handlePaysSearch}
                        onClear={handleDeselectPays}
                    />
                </div>
            </div>
        </div>
    );
};

export default DirectorySearch;
