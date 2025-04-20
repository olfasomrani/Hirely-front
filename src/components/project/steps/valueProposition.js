import { Form, Input } from "antd";

export const ValueProposition = ({ currentProject }) => {
  const validateYoutubeLink = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Mettez votre vidéo!"));
    }
    const youtubeRegex = /^(https?:\/\/)(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(value)) {
      return Promise.reject(new Error("Veuillez entrer un lien YouTube valide!"));
    }
    return Promise.resolve();
  };

  const validateLink = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Mettez votre lien!"));
    }
    const urlRegex = /^(https?:\/\/)([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;
    if (!urlRegex.test(value)) {
      return Promise.reject(new Error("Veuillez entrer un lien valide!"));
    }
    return Promise.resolve();
  };

  const validateStringInput = (_, value) => {
    if (value && /^\d+$/.test(value)) {
      return Promise.reject(
        new Error("La réponse doit être une chaîne de caractères.")
      );
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        name="description"
        label="Décrivez votre projet"
        className="font-bold"
        initialValue={currentProject?.project?.description}
        rules={[
          { required: true, message: "Mettez votre description!" },
          {
            min: 2,
            max: 100,
            message: "Description doit être entre 2 et 100 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="votre description" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="problemAddressing"
        label="Décrivez le problème que vous adressez"
        className="font-bold"
        initialValue={currentProject?.project?.problemAddressing}
        rules={[
          { required: true, message: "Mettez votre problème!" },
          {
            min: 2,
            max: 300,
            message: "Votre probléme doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Entrez votre problème" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="solutionProvided"
        initialValue={currentProject?.project?.solutionProvided}
        label="Décrivez la solution apportée"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre solution!" },
          {
            min: 2,
            max: 300,
            message: "Votre solutions doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez votre solution" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="innovativeSolution"
        initialValue={currentProject?.project?.innovativeSolution}
        label="En quoi votre solution est-elle innovante?"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre réponse!" },
          {
            min: 2,
            max: 300,
            message: "Votre solutions doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez votre solution" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="competitors"
        initialValue={currentProject?.project?.competitors}
        label="Qui sont vos concurrents et qui pourrait devenir votre concurrent? Qui craignez-vous le plus?"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre réponse!" },
          {
            min: 2,
            max: 300,
            message: "vos concurrents doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez vos concurrents" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="solutionFactors"
        initialValue={currentProject?.project?.solutionFactors}
        label="Quelles sont les facteurs différenciants de votre solution?"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre réponse!" },
          {
            min: 2,
            max: 300,
            message: "votre solution doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez les facteurs différenciants" className="border-2 border-black rounded-[8px] font-normal placeholder-primary" rows={4} />
      </Form.Item>

      <Form.Item
        name="businessModel"
        initialValue={currentProject?.project?.businessModel}
        label="Comment comptez-vous gagner de l'argent? Quel est votre Business Model?"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre réponse!" },
          {
            min: 2,
            max: 300,
            message:
              "Votre Business Model doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez votre solution" rows={4} className="border-2 border-black rounded-[8px] font-normal placeholder-primary"/>
      </Form.Item>

      <Form.Item
        name="growthPotential"
        initialValue={currentProject?.project?.growthPotential}
        label="Décrivez le potentiel de croissance de votre projet, les indicateurs clés et les facteurs clés de succès?"
        className="font-bold"
        rules={[
          { required: true, message: "Mettez votre réponse!" },
          {
            min: 2,
            max: 300,
            message: "Description doit être entre 2 et 300 caractères.",
          },
          { validator: validateStringInput },
        ]}
      >
        <Input.TextArea placeholder="Décrivez le potentiel de croissance" className="border-2 border-black rounded-[8px] font-normal placeholder-primary" rows={4} />
      </Form.Item>

      {/* <Form.Item
        name="youtubeVideoDemoLink"
        initialValue={currentProject.project.youtubeVideoDemoLink}
        label="Veuillez poster une vidéo montrant votre produit/prototype?"
        rules={[{ validator: validateYoutubeLink }]}
      >
        <Input placeholder="https://www.youtube.com/" />
      </Form.Item> */}

    </>
  );
};

export default ValueProposition;