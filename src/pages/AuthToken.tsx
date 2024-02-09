import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as localStorage from "../helpers/localStorage";

export default function AuthToken() {
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get("token");
        if (tokenFromUrl) localStorage.setToken(tokenFromUrl);
        window.location.href = "/";
    }, []);
    return null;
}
