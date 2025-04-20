import { Form, Input } from "antd";

export const Funding = ({ currentProject }) => {

  return (
    <>
      <Form.Item
        name="fundingAmount"
        label="Quel est le montant estimé du financement de votre projet?"
        className="font-bold"
        initialValue={currentProject?.project?.fundingAmount}
        rules={[
          { required: true, message: "Mettez votre description!" },
          {
            min: 2,
            max: 100,
            message: "Description doit être entre 2 et 100 caractères.",
          },
          // { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="votre estimation" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>
      <Form.Item
        name="investmentAmount"
        label="Quel est le montant estimé de votre propre investissement?"
        className="font-bold"
        initialValue={currentProject?.project?.investmentAmount}
        rules={[
          { required: true, message: "Mettez votre description!" },
          {
            min: 2,
            max: 100,
            message: "Description doit être entre 2 et 100 caractères.",
          },
          // { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="votre estimation" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>
    </>
  );
};

export default Funding;