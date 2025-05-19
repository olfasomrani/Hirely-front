import axios from "axios";
import API_URL from "../lib/api";

export const offres = async () => {
  try {
    const response = await axios.get(`${API_URL}/offres`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addOffre = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/offres`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteOffre = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/offres/${id}`);
    return response.data;
  } catch (error) {}
};
export const updateOffre = async (formdata, id) => {
  try {
    const response = await axios.patch(`${API_URL}/offres/${id}`, formdata, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {}
};

export const countOffres = async () => {
  try {
    const response = await axios.get(`${API_URL}/offres/nombres`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
