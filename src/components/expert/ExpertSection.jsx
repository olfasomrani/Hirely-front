"use client";
import { useState, useEffect } from "react";
import { Button, Input, message, Modal, Select } from "antd";
import { Selectors } from "@/config/store";
import { useSelector } from "react-redux";
import {
  RightOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getAllExpertiseSectorsWithSubSectors } from "@/services/expertiseSectors";
import { deleteExpertById } from "@/services/experts";
import countriesData from "../../../public/data/countries.json";
import ProfileImage from "../ui/preview/ProfileImage";
import ImageViewer from "../ui/preview/ImageViewer";

const ExpertSection = ({ experts, setExperts, allExperts, handleJoinUs }) => {
  const user = useSelector(Selectors.auth);
  const userIdConnected = user.idUser;
  const [searchText, setSearchText] = useState("");
  const [expertiseDomain, setExpertiseDomain] = useState();
  const [location, setLocation] = useState();
  const [yearsExperience, setYearsExperience] = useState();
  const [expertiseSectors, setExpertiseSectors] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [expertToDelete, setExpertToDelete] = useState(null);

  useEffect(() => {
    const fetchExpertiseSectors = async () => {
      try {
        const response = await getAllExpertiseSectorsWithSubSectors();
        console.log("Expertise Sectors:", response);
        if (response.data && Array.isArray(response.data)) {
          setExpertiseSectors(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching expertise sectors:", error);
      }
    };

    fetchExpertiseSectors();
  }, []);

  const filteredExperts = experts.filter((expert) => {
    console.log("tttttttttttttttt", expert);
    const matchesSearch =
      expert.user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      expert.user.lastName.toLowerCase().includes(searchText.toLowerCase());
    const matchesExpertise = expertiseDomain
      ? expert.subExpertiseSector.expertiseSector.sectorName === expertiseDomain
      : true;
    const matchesLocation = location
      ? expert.user.countries?.includes(location)
      : true;
    const matchesYears = yearsExperience
      ? expert.yearsExperience == parseInt(yearsExperience)
      : true;

    return matchesSearch && matchesExpertise && matchesLocation && matchesYears;
  });
  const experienceOptions = Array.from({ length: 40 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  console.log("allExperts", allExperts);

  const handleDelete = async () => {
    try {
      if (!expertToDelete) return;
      await deleteExpertById(expertToDelete);
      message.success("Demande d'expert a été supprimée avec succès.");
      setDeleteModalVisible(false);
      setExpertToDelete(null);
      setExperts((prevExperts) =>
        prevExperts.filter((e) => e.idExpert !== expertToDelete)
      );
    } catch (error) {
      console.error("Échec de la suppression", error);
      message.error("Échec de la suppression");
    }
  };
  return (
    <>
      <div className="flex items-center flex-col relative">
        <div className="bg-[url('/images/expert.png')] bg-cover bg-center w-full p-4 h-auto z-0">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 flex flex-col items-start mb-4">
            <div className="flex flex-row">
              <div className="pb-[20px]">
                <h2 className="md:text-3xl text-lg font-semibold mb-2 text-white">
                  Postulez à notre Réseau d'experts
                </h2>
                <p className="md:text-lg text-sm mb-4 text-white text-justify">
                  La candidature au poste d'expert permet aux membres de
                  soumettre leur profil afin de rejoindre le cercle d'experts du
                  Business Club. En devenant expert, vous contribuez activement
                  aux projets déposés sur la plateforme en apportant votre
                  expertise et votre savoir-faire. Pour candidater, il suffit de
                  remplir le formulaire en mettant en avant vos compétences et
                  expériences pertinentes. Chaque candidature est rigoureusement
                  étudiée par l'équipe du Business Club pour assurer une
                  sélection cohérente avec les besoins des projets et du réseau.
                  Rejoignez notre communauté d'excellence et participez à des
                  missions à forte valeur ajoutée.
                </p>
                {allExperts?.some(
                  (expert) =>
                    expert?.user?.idUser === userIdConnected &&
                    expert?.status !== "rejected"
                ) ? (
                  <Button className="mt-4 bg-primary text-white border-none px-8 py-4">
                    Votre demande est en cours de traitement
                  </Button>
                ) : (
                  <Button
                    className="mt-4 bg-primary text-white border-none px-8 py-4"
                    onClick={handleJoinUs}
                  >
                    Nous rejoindre
                    <RightOutlined />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-start gap-6 px-6 flex-col">
        <div className="flex flex-col lg:flex-row bg-white p-4 shadow-lg rounded-lg w-full gap-2 items-center">
          <Input
            prefix={<SearchOutlined />}
            className="shadow-md w-full"
            placeholder="Rechercher un expert"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Domaines d'expertise"
            className="shadow-md w-full"
            value={expertiseDomain}
            onChange={(value) => setExpertiseDomain(value)}
            allowClear
          >
            <Select.Option value="">Aucun domaine sélectionné</Select.Option>
            {Array.isArray(expertiseSectors) &&
              expertiseSectors.map((sector) => (
                <Select.Option
                  key={sector.idExpertiseSector}
                  value={sector.sectorName}
                >
                  {sector.sectorName}
                </Select.Option>
              ))}
          </Select>
          <Select
            placeholder="Emplacement"
            className="shadow-md w-full"
            value={location}
            onChange={(value) => setLocation(value)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          >
            <Select.Option value="">
              Aucun emplacement sélectionné
            </Select.Option>
            {countriesData.map((country) => (
              <Select.Option key={country.code} value={country.name}>
                {country.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Années d'expérience"
            className="shadow-md w-full"
            value={yearsExperience}
            onChange={(value) => setYearsExperience(value)}
            allowClear
          >
            <Select.Option value="">Aucune année sélectionnée</Select.Option>
            {experienceOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-wrap gap-5 w-full mb-4">
          {filteredExperts.map((expert) => (
            <div
              key={expert.idExpert}
              className="bg-white p-6 rounded-xl shadow-lg w-[349px] pb-12 transform transition-transform hover:scale-105"
            >
              <div
                className={`w-full grid content-center justify-items-stretch mb-6 rounded-lg overflow-hidden border-4 border-white shadow-md h-[155px]`}
              >
                <ImageViewer
                  alt={expert?.user?.firstName}
                  src={expert?.user.photo}
                  ErrorImage={
                    expert.user.gender === "madam"
                      ? "/icons/gender/profileAvatarWomen.jpg"
                      : "/icons/gender/profileAvatarMen.jpg"
                  }
                  className="rounded-lg overflow-hidden !w-full"
                  preview
                />
              </div>
              <div className="flex flex-row">
                <h3 className="text-lg font-semibold text-center">
                  {expert.user.firstName} {expert.user.lastName}
                </h3>
                {/* <span className="absolute right-1 flex items-center justify-center text-base ml-2 mr-2">
                                    <StarOutlined className="text-primary" />(
                                    {expert.yearsExperience})
                                </span> */}
              </div>
              <div>
                <p className="text-sm text-primary">
                  {expert?.yearsExperience} an
                  {expert?.yearsExperience > 1 ? "s" : ""} d'expérience
                </p>
                <p className="mb-2 mt-4 text-base">
                  {expert?.subExpertiseSector.subSectorName}
                  {/* <p className="text-sm text-primary">
                                        {
                                            expert.subExpertiseSector
                                                .subSectorName
                                        }
                                    </p> */}
                </p>
                <p className="text-sm">
                  {<EnvironmentOutlined />}
                  {""}
                  {expert?.user.countries?.join(", ")}
                </p>

                {/* <p className="text-sm">
                                    {expert.user.description}
                                </p> */}
                {expert?.user.idUser === userIdConnected && (
                  <Button
                    className="absolute bottom-4 right-4"
                    type="link"
                    icon={<DeleteOutlined className="text-red-500" />}
                    onClick={() => {
                      setExpertToDelete(expert.idExpert);
                      setDeleteModalVisible(true);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          <Modal
            title="Confirmation de suppression"
            visible={deleteModalVisible}
            onOk={handleDelete}
            onCancel={() => setDeleteModalVisible(false)}
          >
            <p>Êtes-vous sûr de vouloir supprimer cet expert ?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ExpertSection;
