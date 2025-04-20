import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Presentation = ({ currentProject, onNext }) => {
  const [formData, setFormData] = useState({
    pdfPresentation: "",
    youtubeVideoLink: "",
    documents: [],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentProject?.project?.documents?.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        documents: currentProject.project.documents.map((doc, index) => ({
          uid: index,
          name: doc.name,
          url: doc.linkDoc,
        })),
      }));
    }
  }, [currentProject]);

  const handleFileChange = ({ fileList }) => {
    const isUploading = fileList.some((file) => file.status === "uploading");
    setUploading(isUploading);
    const formattedDocuments = fileList.map((file) => ({
      name: file.name.replace(/[%$#@!*?<>]/g, "_"),
      linkDoc: file.originFileObj?.name.replace(/[%$#@!*?<>]/g, "_"),
    }));

    setFormData((prevData) => ({
      ...prevData,
      documents: formattedDocuments,
    }));
    if (uploading) {
      message.warning("Veuillez attendre la fin du téléchargement des fichiers avant de continuer.");
      return;
    }
  };

  return (
    <>
      <Form.Item
        name="youtubeVideoLink"
        initialValue={currentProject?.project?.youtubeVideoLink}
        label="Veuillez poster une vidéo montrant votre produit/prototype"
        className="font-bold"
      >
        <Input
          placeholder="https://www.youtube.com/"
          className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
        />
      </Form.Item>
      <Form.Item
        name="link"
        initialValue={currentProject?.project?.link}
        label="Veuillez mettre un lien vers votre Produit/Site web/Application?"
        className="font-bold"
      >
        <Input
          placeholder="https://www.exemple.com/"
          className="border-2 border-black rounded-[8px] font-normal placeholder-primary"
        />
      </Form.Item>
      <Form.Item
        name="documents"
        label="Téléchargez des documents"
        valuePropName="fileList"
        className="font-bold"
        getValueFromEvent={(e) => e?.fileList}
      >
        <Upload
          onChange={handleFileChange}
          listType="picture"
          maxCount={5}
          defaultFileList={currentProject?.project?.documents?.map((doc, index) => ({
            uid: index,
            name: doc.name,
            status: "done",
            url: doc.url,
          }))}
        >
          <Button icon={<UploadOutlined />}>Télécharger des documents</Button>
        </Upload>
      </Form.Item>

     
    </>
  );
};

export default Presentation;
