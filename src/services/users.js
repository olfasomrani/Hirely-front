// import api from "./interceptor";
import axios from 'axios';

// get all users
export const users = async () => {
  try {
    const response = await axios.get("http://localhost:3001/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};


// get user by id
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
    const response =  await axios.delete(`http://localhost:3001/users/${idUser}`);
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
