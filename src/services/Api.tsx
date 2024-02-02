import axios, { AxiosResponse } from "axios";
import { API_SERVER_URL } from "../config/constants";
import { PostType, UserType } from "../interfaces";

export const ApiPost = {
    getAllPosts: async (): Promise<PostType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/posts`
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

    createPost: async ({
        title,
        content,
        status,
    }: {
        title: string;
        content: string;
        status: "draft" | "publish";
    }): Promise<PostType> => {
        try {
            console.log(title);
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/post`,
                { title, content, status },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data.data);
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
                `${API_SERVER_URL}/login`,
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
};
