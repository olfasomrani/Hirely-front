"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  DatePicker,
  notification,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllExpertiseSectorsWithSubSectors } from "@/services/expertiseSectors";
import { getAllStudyLevelsWithSubLevels } from "@/services/studyLevels";
import { getAllMissionTypesWithSubTypes } from "@/services/missionTypes";
import ExpertiseSection from "@/components/expert/ExpertiseSection";
import StudyLevelSection from "@/components/expert/StudyLevelSection";
import MissionTypeSection from "@/components/expert/MissionTypeSection";
import { createExpert } from "@/services/experts";
import { useTranslation } from "next-i18next";
import { enGB, fr, ar } from "date-fns/locale";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const JoinUs = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("main");
  const [expertiseData, setExpertiseData] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [subSectors, setSubSectors] = useState([]);
  const [selectedSubSector, setSelectedSubSector] = useState([]);
  const [studyLevels, setStudyLevels] = useState([]);
  const [selectedStudyLevel, setSelectedStudyLevel] = useState(null);
  const [subStudyLevels, setSubStudyLevels] = useState([]);
  const [selectedSubStudyLevels, setSelectedSubStudyLevels] = useState([]);
  const [missionTypes, setMissionTypes] = useState([]);
  const [selectedMissionType, setSelectedMissionType] = useState(null);
  const [subMissionTypes, setSubMissionTypes] = useState([]);
  const [selectedsubMissionType, setSelectedsubMissionType] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [locale, setLocale] = useState(enGB);
  const [formations, setFormations] = useState([
    { formatName: "", institFormat: "", startDate: null, endDate: null },
  ]);
  const [certifications, setCertifications] = useState([
    { certifName: "", institCertif: "", dateObtained: null },
  ]);
  const [references, setReferences] = useState([
    { name: "", relationShip: "", phone: "", email: "" },
  ]);

  const handleCvUpload = ({ file }) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file) {
      if (file.size > maxSize) {
        notification.error({
          message: "Fichier trop volumineux",
          description: "La taille du fichier ne doit pas dépasser 10 Mo.",
          duration: 0,
        });
        setCvFile(null);
        return false;
      }
      setCvFile(file);
    }
    return false;
  };

  useEffect(() => {
    const fetchExpertiseData = async () => {
      try {
        const response = await getAllExpertiseSectorsWithSubSectors();
        setExpertiseData(response.data);
      } catch (error) {
        console.error("Erreur de chargement des secteurs d'expertise", error);
      }
    };
    fetchExpertiseData();
  }, []);

  useEffect(() => {
    const fetchStudyLevels = async () => {
      try {
        const response = await getAllStudyLevelsWithSubLevels();
        setStudyLevels(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des niveaux d'étude",
          error
        );
      }
    };
    fetchStudyLevels();
  }, []);

  useEffect(() => {
    const fetchMissionTypes = async () => {
      try {
        const response = await getAllMissionTypesWithSubTypes();
        setMissionTypes(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types de mission",
          error
        );
      }
    };
    fetchMissionTypes();
  }, []);

  const onSectorChange = (value) => {
    const sector = expertiseData.find(
      (sector) => sector.idExpertiseSector === value
    );
    setSelectedSector(value);
    setSubSectors(sector ? sector.subExpertiseSectors : []);
    setSelectedSubSector(
      sector?.subExpertiseSectors.length > 0
        ? sector.subExpertiseSectors[0].idSubExpertiseSector
        : null
    );
  };

  const onSubSectorChange = (value) => {
    setSelectedSubSector(value);
  };

  const handleStudyLevelChange = (value) => {
    const level = studyLevels.find((level) => level.idStudyLevel === value);
    setSelectedStudyLevel(value);
    setSubStudyLevels(level ? level.subStudyLevels : []);
    setSelectedSubStudyLevels(
      level?.subStudyLevels.length > 0
        ? level.subStudyLevels[0].idSubStudyLevel
        : null
    );
  };
  const onSubStudyLevel = (value) => {
    setSelectedSubStudyLevels(value);
  }

  const handleMissionTypeChange = (value) => {
    const missionType = missionTypes.find(
      (type) => type.idMissionType === value
    );
    setSelectedMissionType(value);
    setSubMissionTypes(missionType ? missionType.subMissionTypes : []);
    setSelectedsubMissionType(
      level?.subMissionTypes.length > 0
        ? level.subMissionTypes[0].idSubMissionType
        : null
    );
  };

  const onSubMissionType = (value) => {
    setSelectedsubMissionType
      (value);
  }
  const addFormation = () => {
    setFormations([
      ...formations,
      {
        formatName: "",
        institFormat: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };

  const removeFormation = (index) => {
    const newFormations = formations.filter((_, i) => i !== index);
    setFormations(newFormations);
  };

  const addReference = () => {
    setReferences([
      ...references,
      { name: "", relationShip: "", phone: "", email: "" },
    ]);
  };

  const removeReference = (index) => {
    const newReferences = references.filter((_, i) => i !== index);
    setReferences(newReferences);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { certifName: "", institCertif: "", dateObtained: null },
    ]);
  };

  const removeCertification = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onFinish = async (values) => {
    const expertData = {
      yearsExperience: values.experienceYears,
      lastPositionOccupy: values.lastPosition,
      descriptionResponsibilities: values.responsibilities,
      keyAchievements: values.keyAchievements,
      whyJoin: values.joinReason,
      addedValue: values.valueProposition,
      certifications: certifications.map((certification) => ({
        certifName: certification.formatName,
        issuingBodyCertif: certification.institCertif,
        dateObtained: formatDate(certification.dateObtained),
      })),
      formations: formations.map((formation) => ({
        formatName: formation.title,
        issuingBodyFormat: formation.institFormat,
        startDate: formation.startDate.format("YYYY-MM-DD"),
        endDate: formation.endDate.format("YYYY-MM-DD"),
      })),
      references: references.map((reference) => ({
        name: reference.name,
        relationShip: reference.relationShip,
        phone: reference.phone,
        email: reference.email,
      })),
      consent: values.consent,
      subMissionTypeId: selectedsubMissionType,
      subExpertiseSectorId: selectedSubSector,
      subStudyLevelId: selectedSubStudyLevels,
      cv: cvFile,
    };

    try {
      await createExpert(expertData);
      notification.success({
        message: "Demande réussie",
        description: "Votre demande a été soumise avec succès !",
        duration: 0,
      });
      router.push("/member/expert");
    } catch (error) {
      console.error("Erreur lors de la création de l'expert:", error);
    }
  };
  const experienceOptions = Array.from({ length: 40 }, (_, i) => (
    <Select.Option key={i + 1} value={i + 1}>
      {i + 1}
    </Select.Option>
  ));

  useEffect(() => {
    switch (i18n.language) {
      case "en":
        setLocale(enGB);
        break;
      case "fr":
        setLocale(fr);
        break;
      case "ar":
        setLocale(ar);
        break;
      default:
        setLocale(enGB);
    }
  }, [i18n.language]);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Rejoignez notre réseau d'experts
      </h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Expertise */}
        <h3 className="font-semibold text-lg">Expertise</h3>
        <ExpertiseSection
          expertiseData={expertiseData}
          onSectorChange={onSectorChange}
          selectedSector={selectedSector}
          subSectors={subSectors}
          onSubSectorChange={onSubSectorChange}
        />

        <Form.Item
          label="Années d'expérience dans le domaine"
          name="experienceYears"
          rules={[
            {
              required: true,
              message: "Veuillez saisir vos années d'expérience.",
            },
          ]}
        >
          <Select placeholder="Sélectionnez vos années d'expérience">
            {experienceOptions}
          </Select>
        </Form.Item>

        <StudyLevelSection
          studyLevels={studyLevels}
          handleStudyLevelChange={handleStudyLevelChange}
          selectedStudyLevel={selectedStudyLevel}
          subStudyLevels={subStudyLevels}
          onSubStudyLevel= {onSubStudyLevel}
        />

        {/* Certifications */}
        <h3 className="font-semibold text-lg">Certifications</h3>
        {certifications.map((certification, index) => (
          <div key={index} className="grid-col-2 lg:grid grid-cols-4 gap-4">
            <Form.Item
              name={`certifName-${index}`}
              label="Intitulé"
              rules={[
                {
                  required: true,
                  message: "L'intitulé est requis",
                },
              ]}
            >
              <Input
                value={certification.certifName}
                onChange={(e) => {
                  const newCertifications = [...certifications];
                  newCertifications[index].certifName = e.target.value;
                  setCertifications(newCertifications);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`institCertif-${index}`}
              label="Organisme"
              rules={[
                {
                  required: true,
                  message: "L'organisme est requis",
                },
              ]}
            >
              <Input
                value={certification.institCertif}
                onChange={(e) => {
                  const newCertifications = [...certifications];
                  newCertifications[index].institCertif = e.target.value;
                  setCertifications(newCertifications);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`dateObtained-${index}`}
              label="Date d'obtention"
              rules={[
                {
                  required: true,
                  message: "La date d'obtention est requise",
                },
              ]}
            >
              <DatePicker
                locale={locale}
                value={certification.dateObtained}
                onChange={(date) => {
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index].dateObtained = date
                    ? date.toISOString()
                    : null;
                  setCertifications(updatedCertifications);
                }}
                placeholder="Sélectionnez une date"
                className="w-[300px]"
              />
            </Form.Item>
            <div>
              {certifications.length > 1 && (
                <Button
                  type="primary"
                  className="mt-[30px]"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeCertification(index)}
                />
              )}
              {index === certifications.length - 1 && (
                <Button
                  className="mt-[30px] ml-[10px] w-[50px] bg-primary"
                  onClick={addCertification}
                  icon={<PlusOutlined className="text-white" />}
                ></Button>
              )}
            </div>
          </div>
        ))}

        {/* Formations */}
        <h3 className="font-semibold text-lg">Formations</h3>
        {formations.map((formation, index) => (
          <div
            key={index}
            className="grid-col-2 lg:grid grid-cols-5 gap-4 mb-4"
          >
            <Form.Item
              name={`formatName-${index}`}
              label="Intitulé"
              rules={[
                {
                  required: true,
                  message: "L'intitulé est requis",
                },
              ]}
            >
              <Input
                value={formation.formatName}
                onChange={(e) => {
                  const newFormations = [...formations];
                  newFormations[index].formatName = e.target.value;
                  setFormations(newFormations);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`institFormat-${index}`}
              label="Organisme"
              rules={[
                {
                  required: true,
                  message: "L'organisme est requis",
                },
              ]}
            >
              <Input
                value={formation.institFormat}
                onChange={(e) => {
                  const newFormations = [...formations];
                  newFormations[index].institFormat = e.target.value;
                  setFormations(newFormations);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`startDate-${index}`}
              label="Date de début"
              rules={[
                {
                  required: true,
                  message: "La date de début est requise",
                },
              ]}
            >
              <DatePicker
                locale={locale}
                value={formation.startDate}
                onChange={(date) => {
                  const newFormations = [...formations];
                  newFormations[index].startDate = date;
                  if (
                    newFormations[index].endDate &&
                    date &&
                    newFormations[index].endDate.isBefore(date)
                  ) {
                    newFormations[index].endDate = null;
                  }
                  setFormations(newFormations);
                }}
                placeholder="Sélectionnez une date"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name={`endDate-${index}`}
              label="Date de fin"
              rules={[
                {
                  required: true,
                  message: "La date de fin est requise",
                },
              ]}
            >
              <DatePicker
                locale={locale}
                value={formation.endDate}
                onChange={(date) => {
                  const newFormations = [...formations];
                  if (
                    date &&
                    formation.startDate &&
                    (date.isSame(formation.startDate) ||
                      date.isBefore(formation.startDate))
                  ) {
                    alert(
                      "La date de fin doit être strictement supérieure à la date de début."
                    );
                    return;
                  }
                  newFormations[index].endDate = date;
                  setFormations(newFormations);
                }}
                disabled={!formation.startDate}
                disabledDate={(current) => {
                  return (
                    formation.startDate &&
                    (current.isSame(formation.startDate) ||
                      current.isBefore(formation.startDate))
                  );
                }}
                placeholder="Sélectionnez une date"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <div>
              {formations.length > 1 && (
                <Button
                  type="primary"
                  className="mt-[30px]"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeFormation(index)}
                />
              )}
              {index === formations.length - 1 && (
                <Button
                  className="mt-[30px] ml-[10px] w-[50px] bg-primary"
                  onClick={addFormation}
                  icon={<PlusOutlined className="text-white" />}
                ></Button>
              )}
            </div>
          </div>
        ))}

        {/* Experience */}
        <h3 className="font-semibold text-lg">Expérience professionnelle</h3>

        <Form.Item
          label="Dernier poste occupé"
          name="lastPosition"
          rules={[{ required: true, message: "Ce champ est requis." }]}
        >
          <TextArea maxLength={200} />
        </Form.Item>

        <Form.Item
          label="Description des responsabilités"
          name="responsibilities"
          rules={[{ required: true, message: "Ce champ est requis." }]}
        >
          <TextArea maxLength={200} />
        </Form.Item>

        <Form.Item
          label="Réalisations clés"
          name="keyAchievements"
          rules={[{ required: true, message: "Ce champ est requis." }]}
        >
          <TextArea maxLength={200} />
        </Form.Item>

        {/* Mission type */}
        <h3 className="font-semibold text-lg">Type de mission</h3>

        <MissionTypeSection
          missionTypes={missionTypes}
          handleMissionTypeChange={handleMissionTypeChange}
          selectedMissionType={selectedMissionType}
          subMissionTypes={subMissionTypes}
          onSubMissionType={onSubMissionType}
        />

        {/* Motivation */}
        <h3 className="font-semibold text-lg">Motivation</h3>

        <Form.Item
          label="Pourquoi souhaitez-vous rejoindre notre réseau d'experts ?"
          name="joinReason"
          rules={[{ required: true, message: "Ce champ est requis." }]}
        >
          <TextArea maxLength={300} />
        </Form.Item>

        <Form.Item
          label="Comment pouvez-vous apporter de la valeur à notre Business Club ?"
          name="valueProposition"
          rules={[{ required: true, message: "Ce champ est requis." }]}
        >
          <TextArea maxLength={300} />
        </Form.Item>

        {/* Professional references */}
        <h3 className="font-semibold text-lg">Références professionnelles</h3>

        {/* Contact de Référence */}
        {references.map((reference, index) => (
          <div
            key={index}
            className="grid-col-2 lg:grid grid-cols-5 gap-4 mb-4"
          >
            <Form.Item
              name={`name-${index}`}
              label="Nom du contact"
              rules={[
                {
                  required: true,
                  message: "Le nom est requis",
                },
              ]}
            >
              <Input
                value={reference.name}
                onChange={(e) => {
                  const newReferences = [...references];
                  newReferences[index].name = e.target.value;
                  setReferences(newReferences);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`relationShip-${index}`}
              label="Relation avec le contact"
              rules={[
                {
                  required: true,
                  message: "La relation est requise",
                },
              ]}
            >
              <Input
                value={reference.relationShip}
                onChange={(e) => {
                  const newReferences = [...references];
                  newReferences[index].relationShip = e.target.value;
                  setReferences(newReferences);
                }}
              />
            </Form.Item>

            <Form.Item
              name={`phone-${index}`}
              label="Tél du contact"
              rules={[
                {
                  required: true,
                  message: "Le téléphone est requis",
                },
              ]}
            >
              <Input
                value={reference.phone}
                onChange={(e) => {
                  const newReferences = [...references];
                  newReferences[index].phone = e.target.value;
                  setReferences(newReferences);
                }}
              />
            </Form.Item>
            <Form.Item
              name={`email-${index}`}
              label="Email du contact"
              rules={[
                {
                  required: true,
                  message: "L'email est requis",
                },
                {
                  type: "email",
                  message: "L'email doit être valide",
                },
              ]}
            >
              <Input
                value={reference.email}
                onChange={(e) => {
                  const newReferences = [...references];
                  newReferences[index].email = e.target.value;
                  setReferences(newReferences);
                }}
              />
            </Form.Item>

            <div>
              {references.length > 1 && (
                <Button
                  type="primary"
                  className="mt-[30px]"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeReference(index)}
                />
              )}
              {index === references.length - 1 && (
                <Button
                  className="mt-[30px] ml-[10px] w-[50px] bg-primary"
                  onClick={addReference}
                  icon={<PlusOutlined className="text-white" />}
                ></Button>
              )}
            </div>
          </div>
        ))}

        <Button type="dashed" onClick={addReference}>
          Ajouter une Reference
        </Button>

        {/* Additional documents */}
        <h3 className="font-semibold text-lg">Documents complémentaires</h3>

        {/* Upload CV */}
        <Form.Item
          label="Charger un CV"
          name="cv"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[{ required: true, message: "Veuillez télécharger un CV." }]}
        >
          <Upload
            beforeUpload={(file) => handleCvUpload({ file })}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Télécharger un CV</Button>
          </Upload>
        </Form.Item>

        {/* Upload Portfolio */}
        <Form.Item label="Charger un portfolio" name="portfolio">
          <Upload>
            <Button icon={<UploadOutlined />}>Charger</Button>
          </Upload>
        </Form.Item>

        {/* Consent */}
        <Form.Item name="consent" valuePropName="checked">
          <Checkbox>
            {" "}
            J'accepte les conditions d'utilisation et la politique de
            confidentialité{" "}
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button className="bg-primary text-white" htmlType="submit">
            {" "}
            Soumettre{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinUs;
