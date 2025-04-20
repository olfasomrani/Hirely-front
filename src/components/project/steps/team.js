import { Form, Input, Select, Radio, InputNumber } from "antd";
 
const { Option } = Select;
 
export const teamOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
export const startUpOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
export const Team = ({ currentProject }) => (
  <>
    <Form.Item
      name="coufoundersNumber"
      initialValue={currentProject?.project?.coufoundersNumber}
      label="Combien de Co-fondateurs êtes vous?"
      className="font-bold"
      rules={[
        {
          required: true,  message: "Veuillez entrer le nombre de cofondateurs!",
        },
      ]}
    >
      <InputNumber min={1} className="border-2 border-black rounded-[8px] font-normal" max={100} />
    </Form.Item>
    <Form.Item
      name="foundingTeamDescription"
      initialValue={currentProject?.project?.foundingTeamDescription}
      label="Décrivez votre équipe de fondateurs"
      className="font-bold"
        rules={[{ required: true, message: "Mettez votre réponse!" },
        {
          min: 2,
          max: 300,
          message:
            "Le description de votre équipe doit être entre 2 et 300 caractères.",
        },
          {
          validator: (_, value) => {
            if (value && /^\d+$/.test(value)) {
              return Promise.reject(new Error("La réponse doit être une chaîne de caractères."));
            }
            return Promise.resolve();
          },
        },
        ]}
    >
      <Input.TextArea placeholder="Décrivez les membres de votre équipe de fondateurs" className="border-2 border-black rounded-[8px] font-normal placeholder-primary" rows={4} />
    </Form.Item>
 
 
 
    <Form.Item
      name="currentTeamExecutedProject"
      initialValue={currentProject?.project?.currentTeamExecutedProject}
      label="Pensez-vous que votre équipe actuelle est en mesure de bien exécuter votre projet?"
      className="font-bold"
      rules={[{ required: true, message: "Veuillez sélectionner une option!" }]}
    >
      <Radio.Group onChange={(e) => console.log(e.target.value)}>
        <Radio value={true}>Oui</Radio>
        <Radio value={false}>Non</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      name="timeSpentProjet"
      initialValue={currentProject?.project?.timeSpentProjet}
      label="Depuis combien de temps travaillez-vous sur le projet? A plein temps ou à mi-temps?"
      className="font-bold"
        rules={[{ required: true, message: "Mettez votre réponse!" },
        {
          min: 2,
          max: 300,
          message:
            "La réponse doit être entre 2 et 300 caractères.",
        },
          {
            validator: (_, value) => {
              if (value && /^\d+$/.test(value)) {
                return Promise.reject(new Error("Le titre doit être une chaîne de caractères"));
              }
              return Promise.resolve();
            },
          },
        ]}
    >
      <Input.TextArea placeholder="Indiquez la durée et si c'est à plein temps ou à mi-temps" className="border-2 border-black rounded-[8px] font-normal placeholder-primary" rows={4} />
    </Form.Item>
    <Form.Item
      name="workedOnOtherProjectTogether"
      initialValue={currentProject?.project?.workedOnOtherProjectTogether}
      label="Avez-vous travaillé ensemble sur d'autres projets?"
      className="font-bold"
        rules={[{ required: true, message: "Mettez votre réponse!" },
        {
          min: 2,
          max: 300,
          message:
            "La réponse doit être entre 2 et 300 caractères.",
        },
          {
            validator: (_, value) => {
              if (value && /^\d+$/.test(value)) {
                return Promise.reject(new Error("La réponse doit être une chaîne de caractères."));
              }
              return Promise.resolve();
            },
          },
        ]}
    >
      <Input.TextArea placeholder="Indiquez si vous avez travaillé ensemble sur d'autres projets et lesquels" className="border-2 border-black rounded-[8px] font-normal placeholder-primary" rows={4} />
    </Form.Item>
 
    <Form.Item
      name="launchedStartupPreviously"
      initialValue={currentProject?.project?.launchedStartupPreviously}
      label="Avez-vous déja lancé une Startup?"
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
export default Team;