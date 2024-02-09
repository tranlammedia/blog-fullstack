// AuthContext.js
import { createContext, useContext, useState } from "react";

const ShowNavLeftContext = createContext({});

export const ShowNavLeftProvider = ({ children }) => {
    const [showNavLeft, setShowNavLeft] = useState({});

    return (
        <ShowNavLeftContext.Provider value={{ showNavLeft, setShowNavLeft }}>
            {children}
        </ShowNavLeftContext.Provider>
    );
};

export const useShowNavLeft = () => {
    const context = useContext(ShowNavLeftContext);
    if (!context) {
        throw new Error(
            "useShowNavLeft must be used within a ShowNavLeftProvider"
        );
    }
    return context;
};
