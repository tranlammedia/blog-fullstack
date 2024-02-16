import axios, { AxiosResponse } from "axios";
import { API_SERVER_URL } from "../config/constants";
import { CategoryType, PostType, TagType, UserType } from "../interfaces";
import { getToken } from "../helpers/localStorage";

const token = getToken();

export const ApiPost = {
    getAllPosts: async (): Promise<PostType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/post`
            );

            return response.data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    getPost: async (id: string): Promise<PostType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/post/${id}`
            );

            return response.data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    createPost: async (newPost: Object): Promise<PostType> => {
        try {
            // console.log(newPost);
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/post`,
                newPost,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    },
};

export const ApiUser = {
    createUser: async (requestBody: UserType): Promise<UserType> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/user`,
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    loginUserJwt: async (requestBody: UserType): Promise<string> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/auth/login`,
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.headers["authorization"];
        } catch (error) {
            throw error;
        }
    },

    loginSuccess: async (token: string): Promise<UserType> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/auth/success`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
};

export const ApiCategory = {
    createCategory: async (requestBody: Object): Promise<CategoryType> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/category`,
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },


    getAll: async (): Promise<CategoryType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/category`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
};

export const ApiTag = {
    createTag: async (requestBody: Object): Promise<TagType> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/tag`,
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                }
            );
            console.log(response);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },


    getAll: async (): Promise<TagType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/tag`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
};