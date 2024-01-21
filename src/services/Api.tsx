import axios, { AxiosResponse } from "axios";
import { API_SERVER_URL } from "../config/constants";

interface TypePost {
  id: string;
  title: string;
  content: string;
  author: string;
}

export const ApiService = {
  getAllPosts: async (): Promise<TypePost[]> => {
    try {
      const response: AxiosResponse<TypePost[]> = await axios.get(
        `${API_SERVER_URL}/posts`
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};



