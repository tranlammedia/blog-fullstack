// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import * as localStorage from "../helpers/storage";
import * as cookies from "../helpers/cookies";
import { ApiUser } from "../services/Api";
import { UserType } from "../interfaces";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState<UserType | null>(
        cookies.getCookie()
    );

    useEffect(() => {
        const token = localStorage.getToken();
        if (token) login(token);
    }, []);

    const login = async (token: string) => {
        if (!(token && localStorage.checkToken(token))) {
            return logout();
        }
        try {
            const user = await ApiUser.loginSuccess(token);
            cookies.setCookie(user);
            return setUserLogin(user);
        } catch (error) {
            console.log(error);
            return logout();
        }
    };

    const logout = () => {
        // Thực hiện logic đăng xuất
        localStorage.deleteToken();
        cookies.deleteCookie();
        setUserLogin(null);
    };

    return (
        <AuthContext.Provider value={{ userLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
