import { decodeJwt } from "./convert";

const checkTokenExpiry = (storedToken: string): boolean => {
    const decodedToken = decodeJwt(storedToken);
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        return true;
    }
    return false;
};

export const checkToken = (token: string) => {
    if (token) return checkTokenExpiry(token);

    return false;
};

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export const deleteToken = () => {
    localStorage.removeItem("token");
};
