import { Form, Checkbox, Radio } from "antd";

const options = [
  { label: 'Mise en relation avec le réseau Professionnel', value: 'Mise en relation avec le réseau Professionnel' },
  { label: 'Assistance pour le Business Plan', value: 'Assistance pour le Business Plan' },
  { label: 'Retour d’expérience de notre Réseau D’Experts', value: 'Retour d’expérience de notre Réseau D’Experts' },
  { label: 'Accompagnement sur le terrain pour votre projet', value: 'Accompagnement sur le terrain pour votre projet' },
  { label: 'Avoir un diagnostic approfondi de votre projet', value: 'Avoir un diagnostic approfondi de votre projet' },
  { label: 'Soutien au Financement de votre projet', value: 'Soutien au Financement de votre projet' },
  { label: 'Autre', value: 'Autre' },
];

export const Expectations = ({ currentProject }) => (
  <>
    <Form.Item
      name="yourExpectFromCMDA"
      initialValue={currentProject?.project?.yourExpectFromCMDA ? currentProject.project.yourExpectFromCMDA.split(',').map(item => item.trim()) : []}
      label="Quelles sont vos attentes de l'équipe CMDA pour ce projet?"
      className="font-bold"
      rules={[
        { required: true, message: "Veuillez sélectionner votre réponse!" },
      ]}
    >
      <Checkbox.Group
        options={options}
        className="flex flex-col gap-y-2"
        onChange={(checkedValues) => console.log(checkedValues)}
      />
    </Form.Item>
    
    <Form.Item
      name="infoExactitude"
      initialValue={currentProject?.project?.infoExactitude}
      label="Je certifie l'exactitude des informations saisies?"
      className="font-bold"
      rules={[
        { required: true, message: "Veuillez sélectionner votre réponse!" },
      ]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Je confirme</Radio>
      </Radio.Group>
    </Form.Item>
    
    {/* <Form.Item
      name="acceptLabelStartup"
      initialValue={currentProject?.project?.acceptLabelStartup}
      label="Je déclare accepter les conditions de soumission de candidature pour le label startup?"
      className="font-bold"
      rules={[
        { required: true, message: "Veuillez sélectionner votre réponse!" },
      ]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Je confirme</Radio>
      </Radio.Group>
    </Form.Item> */}
    
    <Form.Item
      name="contactShare"
      initialValue={currentProject?.project?.contactShare}
      label="Est-ce que vous nous autorisez à partager vos coordonnées (téléphone, email, nom, prénom) dans le cadre d'une opportunité?"
      className="font-bold"
      rules={[
        { required: true, message: "Veuillez sélectionner votre réponse!" },
      ]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Oui</Radio>
        <Radio value={false}>Non</Radio>
      </Radio.Group>
    </Form.Item>
  </>
);

export default Expectations;
