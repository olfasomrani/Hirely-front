import axios from "axios";
import API_URL from "../lib/api";

export const candidates = async () =>{
    try{
        const response = await axios.get("http://localhost:3001/candidates");
        return response.data;

    }catch(error){
        throw error
    }
}


export const countCandidates = async () => {
    try {
      const response = await axios.get(`${API_URL}/candidates/nombres`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };