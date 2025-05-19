import axios from "axios";

// get all recruteur
export const candidates = async () => {
  try {
    const response = await axios.get("http://localhost:3001/recruteurs");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// count recteuir
export const countRecruteurs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/recruteurs/nombres"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
