import axios from "axios";

// Configure Axios globalement (optionnel mais recommandé)
axios.defaults.withCredentials = true;

// login with email && password
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      { email, password },
      { withCredentials: true } // essentiel pour les cookies
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// register user
export const register = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/register",
      formData,
      { withCredentials: true } // optionnel ici, mais cohérent
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get current user profile from cookie token
export const getProfile = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/auth/profile",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// logout user (si tu ajoutes un endpoint /auth/logout)
export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
