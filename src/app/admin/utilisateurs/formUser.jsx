import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, notification, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  LockOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PasswordInput from "../../../components/common/password";
import countriesData from "../../../../public/data/countries.json";
import {
  getUserById,
  updateUser,
  createUser,
  checkIfEmailExist,
} from "../../../services/users";
import { getAllCompanies } from "../../../services/Company";
import dayjs from "dayjs";

const { Option } = Select;

function EditUser({ userId, onSuccess, onSuccessAdd }) {
  const router = useRouter();
  const isEditing = Boolean(userId);

  const [photoFile, setPhotoFile] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [company, setCompany] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    civility: "sir",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    birthday: "",
    photo: "",
    countries: [],
    company: "",
  });

  const handleCountriesChange = (value) => {
    setForm({ ...form, countries: value });
  };
   const handlePasswordChange = (password) => {
    setForm({ ...form, password });
  };

  useEffect(() => {
    const sortedCountries = countriesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setAvailableCountries(sortedCountries);
  }, []);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies();
        setCompany(companiesData);
      } catch (error) {
        notification.error({
          message: "Erreur",
          description: `Échec de chargement des entreprises : ${error.message}`,
          duration: 0,
        });
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (isEditing) {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(userId);
          setForm({
            firstName: userData.user?.firstName || "",
            lastName: userData.user?.lastName || "",
            civility: userData.user?.civility || "sir",
            role: userData.user?.role || "",
            email: userData.user?.email || "",
            phone: userData.user?.phone || "",
            address: userData.user?.address || "",
            city: userData.user?.city || "",
            postalCode: userData.user?.postalCode || "",
            birthday: userData.user?.birthday ? dayjs(userData.user.birthday) : "",
            photo: userData.user?.photo || "",
            countries: userData.user?.countries || [],
            company: userData.user?.company?.idCompany  || "",
          });
        } catch (error) {
          notification.error({
            message: "Erreur",
            description: `Échec de chargement des données : ${error.message}`,
            duration: 0,
          });
        }
      };
      fetchUser();
    } else {
      setForm({
        firstName: "",
        lastName: "",
        civility: "sir",
        email: "",
        password: "",
        role: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        birthday: "",
        photo: "",
        countries: [],
        company: "",
      });
    }
  }, [isEditing, userId]);

  const handleCompanyChange = (value) => {
    setForm({ ...form, company: value });
  };

  const filterCompanies = (input, option) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "email") {
      updatedValue = value.toLowerCase();
    }
  
    setForm({ ...form, [name]: updatedValue });
  
    if (name === "email") {
      try {
        const response = await checkIfEmailExist(updatedValue);
        setEmailExists(response);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        setEmailExists(false);
      }
    }
  };

  const handleDateChange = (date) => {
    setForm({ ...form, birthday: date });
  };

  const handleSelectChange = (value) => {
    setForm({ ...form, civility: value });
  };

  const handleSelectRole = (value) => {
    setForm({ ...form, role: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.role ||
      !form.civility ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.postalCode ||
      !form.countries ||
      !form.company
    ) {
      notification.error({
        message: "Erreur",
        description: "Tous les champs obligatoires doivent être remplis.",
        duration: 0,
      });
      return;
    }

    try {
      const newUserForm = {
        ...form,
        photo: photoFile,
        birthday: form.birthday ? form.birthday.toISOString() : "",
      };
      
      let newUser;
      if (userId) {
        newUser = await updateUser(userId, newUserForm);
        if (onSuccess) onSuccess(newUser);
      } else {
        if (!form.password) {
          throw new Error("Le mot de passe est requis.");
        }
        newUser = await createUser(newUserForm);
        if (onSuccessAdd) onSuccessAdd(newUser);
      }

      setForm({
        firstName: "",
        lastName: "",
        civility: "sir",
        email: "",
        password: "",
        role: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        birthday: "",
        photo: "",
        countries: [],
        company: "",
      });
      setPhotoFile(null);

      router.push("/admin/utilisateurs");
    } catch (error) {
      notification.error({
        message: "Erreur",
        description: "Tous les champs obligatoires doivent être remplis.",
        duration: 0,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            prefix={<UserOutlined />}
            className="w-full"
          />
          <Input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Nom"
            prefix={<UserOutlined />}
            className="w-full"
          />
          <Select
            value={form.civility}
            onChange={handleSelectChange}
            className="w-full"
            placeholder="Civilité"
          >
            <Option value="sir">Monsieur</Option>
            <Option value="madam">Madame</Option>
            <Option value="indefinite">Indéfini</Option>
          </Select>
          <Select
            value={form.role}
            onChange={handleSelectRole}
            className="w-full"
            placeholder="Rôle"
          >
            <Option value="noMember">No member</Option>
            <Option value="member">Member</Option>
            <Option value="adminCMDA">admin Cmda</Option>
            <Option value="adminMember">adminMember</Option>
          </Select>
          <div>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              prefix={<MailOutlined />}
              className="w-full"
            />
            {emailExists && (
              <div className="text-red-500 text-sm mb-4">
                Cet email existe déjà. Veuillez en choisir un autre.
              </div>
            )}
          </div>
          {!userId && (
             <div>
             <label>Mot de passe</label>
             <PasswordInput
                value={form.password}
                onChange={handlePasswordChange}
                className="mb-4"
                firstName={form.firstName || ""}
                lastName={form.lastName || ""}
              />
           </div>
          )}
          
          <Select
            mode="multiple"
            value={form.countries}
            onChange={handleCountriesChange}
            className="w-full mb-4"
          >
            {availableCountries.map((country) => (
              <Option key={country.id} value={country.name}>
                {country.name}
              </Option>
            ))}
          </Select>
          <Select
            className="w-full"
            onChange={handleCompanyChange}
            showSearch
            filterOption={filterCompanies}
            optionFilterProp="children"
            value={form.company}
          >
            {company.map((com) => (
              <Option key={com.idCompany} value={com.idCompany}>
                {com.companyName}
              </Option>
            ))}
          </Select>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            prefix={<PhoneOutlined />}
            className="w-full"
          />
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Adresse"
            prefix={<HomeOutlined />}
            className="w-full"
          />
          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Ville"
            prefix={<IdcardOutlined />}
            className="w-full"
          />
          <Input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            placeholder="Code postal"
            prefix={<EnvironmentOutlined />}
            className="w-full"
          />
          <DatePicker
            onChange={handleDateChange}
            value={form.birthday}
            className="w-full"
            placeholder="Date de naissance"
            format="DD/MM/YYYY"
          />
          {!userId && (
            <input type="file" onChange={handlePhotoChange} className="mb-4" />
          )}

          <Button className="bg-primary text-white w-full" htmlType="submit">
            {userId ? "Modifier" : "Ajouter"}
          </Button>
          <div className="text-center">
            <a
              href="/admin/utilisateurs"
              className="text-sm text-primary hover:underline"
            >
              Annuler
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
