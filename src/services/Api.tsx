import axios, { AxiosResponse } from "axios";
import { API_SERVER_URL } from "../config/constants";
import { CategoryType, PostType, TagType, UserType } from "../interfaces";
import { getToken } from "../helpers/storage";

const token = getToken();

interface fetchPost {
    totalPages: number;
    page: number;
    data: PostType[];
}
interface paramsGetPosts {
    page: string | number;
    perpage: string | number;
    categoryId?: string | null;
    tagId?: string | null;
    sortby?: string | null;
}
export const ApiPost = {
    getPostsForReader: async (paramsInput = {}): Promise<fetchPost> => {
        const params: paramsGetPosts = { page: 1, perpage: 10, ...paramsInput };
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/post`,
                { params: params }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPostsForAdmin: async (
        page: string | number = 1,
        perpage: string | number = 10
    ): Promise<fetchPost> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/post/manage?page=${page}&perpage=${perpage}`,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response.status == 404) {
                return {
                    totalPages: 0,
                    page: 0,
                    data: [],
                };
            }
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
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/post`,
                newPost,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    },

    updatePost: async (newPost: PostType): Promise<PostType> => {
        try {
            const updatePost = {
                title: newPost.title,
                content: newPost.content,
                description: newPost.description,
                featureImageUrl: newPost.featureImageUrl,
                status: newPost.status,
                categoryIds: newPost.categoryIds.map((el) =>
                    el.hasOwnProperty("_id") ? el._id : el
                ),
                tagIds: newPost.tagIds.map((el) =>
                    el.hasOwnProperty("_id") ? el._id : el
                ),
            };
            const response: AxiosResponse<any> = await axios.put(
                `${API_SERVER_URL}/post/${newPost._id}`,
                updatePost,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    },
    deletePost: async (id: string): Promise<PostType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                `${API_SERVER_URL}/post/${id}`,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
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
                    // withCredentials: true,
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

    loginUserJwt: async (requestBody: UserType): Promise<string> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_SERVER_URL}/auth/login`,
                requestBody,
                {
                    // withCredentials: true,
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
                    // withCredentials: true,
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
                    // withCredentials: true,
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

    getAll: async (): Promise<CategoryType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/category`,
                {
                    // withCredentials: true,
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

    updateCategory: async (updateCategory: CategoryType): Promise<PostType> => {
        try {
            const response: AxiosResponse<any> = await axios.put(
                `${API_SERVER_URL}/category/${updateCategory._id}`,
                updateCategory,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    },

    deleteCategory: async (updateCategory: CategoryType): Promise<PostType> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                `${API_SERVER_URL}/category/${updateCategory._id}`,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    },

    getPostCountByCategory: async () => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/category/count-posts`
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
                    // withCredentials: true,
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

    getAll: async (): Promise<TagType[]> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/tag`,
                {
                    // withCredentials: true,
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
    updateTag: async (updateTag: TagType): Promise<TagType> => {
        try {
            const response: AxiosResponse<any> = await axios.put(
                `${API_SERVER_URL}/tag/${updateTag._id}`,
                updateTag,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error creating tag:", error);
            throw error;
        }
    },
    deleteTag: async (updateTag: TagType): Promise<PostType> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                `${API_SERVER_URL}/tag/${updateTag._id}`,
                {
                    // withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error creating tag:", error);
            throw error;
        }
    },

    getPostCountByTag: async () => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_SERVER_URL}/tag/count-posts`
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
};
