// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { checkAuth, clearAuth } from "../helpers/handleAuth";
import { decodeJwt } from "../helpers/convert";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (): object | null => {
        // Thực hiện logic đăng nhập
        if (checkAuth()) {
            setIsLoggedIn(true);
            return decodeJwt();
        } else {
            setIsLoggedIn(false);
            return null;
        }
    };

    const logout = () => {
        // Thực hiện logic đăng xuất
        clearAuth();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
