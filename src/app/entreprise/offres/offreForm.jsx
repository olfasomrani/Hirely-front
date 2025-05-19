"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const UserForm = ({ offreId, onSuccess, onSuccessAdd }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (offreId) {
      fetch(`http://localhost:3001/offres/${offreId}`)
        .then((res) => res.json())
        .then((data) => {
          form.setFieldsValue({
            ...data,
          });

          if (data.image) {
            const fileName = data.image.split("/").pop();
            const fileUrl = `http://localhost:3001/uploads/offres/${fileName}`;

            setFile({
              uid: "-1",
              name: fileName,
              status: "done",
              url: fileUrl,
            });
          }
        });
    }
  }, [offreId]);

  const onFinish = async (values) => {
    const formData = new FormData();

    console.log("Valeurs du formulaire :", values);

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("salary", values.salary);
    formData.append("recruiterId", parseInt(3));

    if (file) {
      console.log("Fichier sélectionné :", file);
      formData.append("image", file);
    } else {
      console.log("Aucun fichier sélectionné.");
    }

    try {
      const endpoint = offreId
        ? `http://localhost:3001/offres/${offreId}`
        : `http://localhost:3001/offres`;

      const method = offreId ? "PATCH" : "POST";

      console.log(`Envoi de la requête ${method} à ${endpoint}`);

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const response = await res.json();
      console.log("Réponse du serveur :", response);

      if (offreId) {
        onSuccess && onSuccess({ ...values, id: offreId });
      } else {
        onSuccessAdd && onSuccessAdd(response);
      }
    } catch (err) {
      console.error("Erreur lors du fetch :", err);
      message.error("Erreur lors de l’envoi du formulaire");
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === "removed") {
      setFile(null);
    } else {
      setFile(info.file);
    }
    console.log("file", file);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="salary" label="Salaire" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Photo">
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          maxCount={1}
          listType="picture"
          fileList={
            file ? [{ uid: "-1", name: file.name, status: "done" }] : []
          }
          onRemove={() => setFile(null)}
        >
          <Button icon={<UploadOutlined />}>Télécharger une image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {offreId ? "Modifier" : "Ajouter"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
