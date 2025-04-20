import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

function CitySelect({
  control,
  name,
  rules,
  label,
  required,
  errors,
  className,
}) {
  const [options, setOptions] = useState([]);

  // Function to retrieve countries from the Countries REST API
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryOptions = data.map((country) => ({
        value: country.cca2,
        label: country.name.common,
        countryCode: country.cca2,
      }));
      setOptions(countryOptions);
    } catch (error) {
      console.error("Erreur lors de la récupération des pays:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const formatOptionLabel = ({ label, countryCode }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em" }}
      />
      <span>{label}</span>
    </div>
  );

  return (
    <div className={`${className || ""} flex flex-col mb-4`}>
      <label className="font-semibold text-xs text-darkgrey mx-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            formatOptionLabel={formatOptionLabel}
            classNamePrefix="select"
            onChange={(selected) => field.onChange(selected)}
            value={field.value}
          />
        )}
      />
      {errors?.[name] && (
        <span className="text-[10px] text-red-600 font-semibold mx-1 h-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default CitySelect;
