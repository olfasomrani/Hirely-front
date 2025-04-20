import React, { useEffect, useState } from "react";
import axios from "axios";

const NetworkSearch = ({
  onSearch,
  setSelectedCountry,
  setSelectedCompany,
  searchTerm,
  setSearchTerm,
}) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountries(countryList);
        setFilteredCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();

    const fetchCompanies = async () => {
      try {
        const companyList = [
          { label: "Société 1", value: "Société 1" },
          { label: "Société 2", value: "Société 2" },
          { label: "Société 3", value: "Société 3" },
        ];
        setCompanies(companyList);
        setFilteredCompanies(companyList);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCountrySearch = (input) => {
    const filtered = countries.filter((country) =>
      country.label.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCompanySearch = (input) => {
    const filtered = companies.filter((company) =>
      company.label.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <></>
  );
};

export default NetworkSearch;
