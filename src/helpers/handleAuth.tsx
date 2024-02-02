import { decodeJwt } from "./convert";

const checkTokenExpiry = (storedToken: string): boolean => {
    const decodedToken = decodeJwt(storedToken);
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        return true;
    }
    return false;
};

export const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) return checkTokenExpiry(token);

    return false;
};

export const setAuth = (token: string) => {
    localStorage.setItem("token", token);
};

export const clearAuth = () => {
    localStorage.removeItem("token");
};
