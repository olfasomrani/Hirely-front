import { Form, Select, Radio } from "antd";
const { Option } = Select;
 
// export const stadeOptions = [
//   { label: "Idea", value: "Idea" },
//   { label: "Prototype", value: "Prototype" },
//   { label: "MVP", value: "MVP" },
//   { label: "Early Sales", value: "Early Sales" },
//   { label: "Growth", value: "Growth" },
// ];
export const participationOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
export const prixOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
export const brevetsOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
export const Advancement = ({ currentProject }) => (
  <>
    {/* <Form.Item
      name="projectProgressDetails"
      label="A quel stade de developpement du projet êtes vous?"
      // rules={[
      //   { required: true, message: "Selectionnez votre type de marché!" },
      // ]}
    >
      <Radio.Group
        options={stadeOptions}
        onChange={(checkedValues) => console.log(checkedValues)}
      />
    </Form.Item> */}
 
    {/* <Form.Item
      name="status"
      label="Quel est la satut de votre projet?"
      className="font-bold"
      initialValue={currentProject?.project?.status}
      rules={[
        {
          required: true,
          message: " Veuillez Selectionner votre statut!",
        },
      ]}
    >
      <Select placeholder="Sélectionnez le statut de votre projet" className="border-2 border-black rounded-[8px] font-normal">
        <Option value="draft">Brouillon</Option>
        <Option value="filed">Déposé</Option>
        <Option value="underInstruction">En instruction</Option>
        <Option value="identifiedPartners">Partenaires identifiés</Option>
        <Option value="selectedPartners">Partenaires sélectionnés</Option>
        <Option value="denied"> Refusé</Option>
        <Option value="accepted">Accepté</Option>
        <Option value="Request Additional Information">
          Demande d'informations supplémentaires
        </Option>
      </Select>
    </Form.Item> */}
    {/* <Form.Item
      name="stade"
      label="Veuillez détailler l'avancement actuel de votre projet(produit,le marché,partenaire...)"
      //   rules={[{ required: true, message: "Mettez votre réponse!" }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item> */}
    <Form.Item
      name="programParticipate"
      initialValue={currentProject?.project?.programParticipate}
      label="Avez-vous participé à un programme d'accélération/Incubation/Accompagnement?"
      className="font-bold"
      rules={[{ required: true, message: "Veuillez sélectionner une option!" }]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Oui</Radio>
        <Radio value={false}>Non</Radio>
      </Radio.Group>
    </Form.Item>
 
    <Form.Item
      name="entrepreneurshipAward"
      initialValue={currentProject?.project?.entrepreneurshipAward}
      label="Avez vous déja gagné un prix d'entrepreneuriat?"
      className="font-bold"
      rules={[{required: true, message: "Veuillez sélectionner une option!" }]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Oui</Radio>
        <Radio value={false}>Non</Radio>
      </Radio.Group>
    </Form.Item>
 
    <Form.Item
      name="everFieldPatents"
      initialValue={currentProject?.project?.everFieldPatents}
      label="Avez-vous déja déposé des brevets?"
      className="font-bold"
      rules={[{ required: true, message: "Veuillez sélectionner une option!" }]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Oui</Radio>
        <Radio value={false}>Non</Radio>
      </Radio.Group>
    </Form.Item>
  </>
);
 
export default Advancement;