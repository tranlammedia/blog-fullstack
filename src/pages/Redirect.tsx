import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as storage from "../helpers/storage"

export default function Redirect() {
    const { path } = useParams();
    useEffect(() => {
        console.log(path)
        if (path === "new") {
            storage.deletePost();
            window.location.href = "/dashboard/new";
        } else {
            window.location.href = "/"
        }
    }, []);
    return null;
}
