import React, { useEffect, useState } from "react";
import { Input, Button, DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import countriesData from "../../../public/data/countries.json";
import nationalityData from "../../../public/data/nationalities.json";

const { Option } = Select;

const EditUserForm = ({ userData, onChange, onSubmit }) => {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [nationalities, setNationalites] = useState([]);

  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      onChange({ ...userData, birthday: date.format("YYYY-MM-DD") });
    } else {
      onChange({ ...userData, birthday: "" });
    }
  };
  useEffect(() => {
    const sortedNationality = nationalityData;
    setNationalites(sortedNationality);
  }, []);
  useEffect(() => {
    const sortedCountries = countriesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setAvailableCountries(sortedCountries);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Modifier mes informations
        </h2>
        <Space direction="vertical" size="middle" className="w-full">
          <div className="form-group">
            <label className="block font-medium text-gray-600">Prénom:</label>
            <Input
              placeholder="Prénom"
              value={userData.firstName}
              onChange={(e) =>
                onChange({ ...userData, firstName: e.target.value })
              }
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">Nom:</label>
            <Input
              placeholder="Nom"
              value={userData.lastName}
              onChange={(e) =>
                onChange({ ...userData, lastName: e.target.value })
              }
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">Email:</label>
            <Input
              placeholder="Email"
              value={userData.email}
              onChange={(e) => onChange({ ...userData, email: e.target.value })}
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Téléphone:
            </label>
            <Input
              placeholder="Téléphone"
              value={userData.phone}
              onChange={(e) => onChange({ ...userData, phone: e.target.value })}
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">Adresse:</label>
            <Input
              placeholder="Adresse"
              value={userData.address}
              onChange={(e) =>
                onChange({ ...userData, address: e.target.value })
              }
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">Ville:</label>
            <Input
              placeholder="Ville"
              value={userData.city}
              onChange={(e) => onChange({ ...userData, city: e.target.value })}
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Date de naissance:
            </label>
            <DatePicker
              placeholder="Date de naissance"
              format="DD/MM/YYYY"
              value={userData.birthday ? dayjs(userData.birthday) : null}
              onChange={handleDateChange}
              style={{ width: "100%" }}
              className="border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Code postal:
            </label>
            <Input
              placeholder="Code postal"
              value={userData.postalCode || ""}
              onChange={(e) =>
                onChange({ ...userData, postalCode: e.target.value })
              }
              className="border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-600">Civilité:</label>
            <Select
              placeholder="Civilité"
              value={userData.civility || ""}
              onChange={(value) => onChange({ ...userData, civility: value })}
              style={{ width: "100%" }}
              className="border-gray-300 rounded-md"
            >
              <Option value="sir">Monsieur</Option>
              <Option value="madam">Madame</Option>
              <Option value="indefinite">Indéfini</Option>
            </Select>
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Pays visités:
            </label>
            <Select
              mode="multiple"
              value={userData.countries}
              onChange={(value) => onChange({ ...userData, countries: value })}
              style={{ width: "100%" }}
              className="border-gray-300 rounded-md"
            >
              {countriesData.map((country) => (
                <Option key={country.id} value={country.name}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Nationalité
            </label>
            <Select
              showSearch
              value={userData.nationality}
              onChange={(value) => onChange({ ...userData, nationality: value })}
              className="w-full mb-4"
            >
              {nationalities.map((item) => (
                <Option key={item.id} value={item.nationality}>
                  {item.nationality}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Lien LinkedIn:
            </label>
            <Input
              placeholder="LinkedIn URL"
              value={userData.linkedinLink || ""}
              onChange={(e) =>
                onChange({ ...userData, linkedinLink: e.target.value })
              }
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="form-group">
            <label className="block font-medium text-gray-600">
              Description:
            </label>
            <Input.TextArea
              placeholder="Description"
              value={userData.description || ""}
              onChange={(e) =>
                onChange({ ...userData, description: e.target.value })
              }
              rows={4}
              className="border-gray-300 rounded-md"
            />
          </div>

          <Button
            htmlType="submit"
            className="text-white w-full py-2 rounded-md bg-primary"
            onClick={onSubmit}
          >
            Mettre à jour
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default EditUserForm;
