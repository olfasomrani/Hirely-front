import api from "./interceptor";
import axios from 'axios';


export const users = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};


// collect user by id
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (idUser) => {
  try {
    const response = await api.delete(`/api/v1/users/${idUser}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update user
export const updateUser = async (idUser, updatedUserData) => {
  try {
    const response = await api.patch(
      `/api/v1/users/${idUser}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create user
export const createUser = async (formData) => {
  try {
    const response = await api.post("/api/v1/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (idUser, updatedUserData) => {
  try {
    const response = await api.patch(
      `/api/v1/users/update-password/${idUser}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add profile picture
export const addUpdProfilePicture = async (idUser, token, photoFile) => {
  try {
    const formData = new FormData();
    formData.append("photo", photoFile);

    const response = await api.post(`/api/v1/users/${idUser}/photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add && Update user profile pic by id teamBC
export const addUpdateProfilePicBC = async (idUser, photo) => {
  try {
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await api.post(
      `/api/v1/users/bc/photo/${idUser}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Checking mail existence
export const checkIfEmailExist = async (email) => {
  try {
    const response = await api.post("/api/v1/users/check-email", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const checkIfEmailExiste = async (email) => {
  console.log("Appel au service checkIfEmailExist avec :", email);
  try {
      const response = await api.post("/api/v1/users/check-email", { email });
      if (response.data && response.data.message === "Email exists") {
          return { exists: true, ...response.data };
      } else {
          return { exists: false };
      }
  } catch (error) {
      console.error("Erreur API:", error);
      return { exists: false }; 
  }
};