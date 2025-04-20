import React from "react";
import { Form, Input, DatePicker } from "antd";

const CertificationSection = () => (
  <Form.Item label="Certifications" name="certifications">
    <div className="grid grid-cols-3 gap-4">
      <Form.Item
        label="Intitulé"
        name={["certifications", "title"]}
        rules={[
          {
            required: true,
            message: "Veuillez entrer l'intitulé de la certification",
          },
        ]}
      >
        <Input placeholder="Intitulé" />
      </Form.Item>
      <Form.Item
        label="Organisme"
        name={["certifications", "institution"]}
        rules={[
          {
            required: true,
            message: "Veuillez entrer l'organisme de certification",
          },
        ]}
      >
        <Input placeholder="Organisme" />
      </Form.Item>
      <Form.Item
        label="Date d'obtention"
        name={["certifications", "dateObtained"]}
        rules={[
          { required: true, message: "Veuillez entrer la date d'obtention" },
        ]}
      >
        <DatePicker placeholder="Date d'obtention" />
      </Form.Item>
    </div>
  </Form.Item>
);

export default CertificationSection;
