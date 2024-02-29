// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import * as localStorage from "../helpers/storage";
import * as cookies from "../helpers/cookies";
import { ApiUser } from "../services/Api";
import { CategoryType, PostType, TagType } from "../interfaces";

const EditorContext = createContext({});

export const EditorProvider = ({ children }) => {
    const [post, setPost] = useState<PostType | null>(null);
    const [categories, setCategories] = useState<CategoryType | []>([]);
    const [tags, setTags] = useState<TagType | []>([]);

    useEffect(() => {

    }, []);


    return (
        <EditorContext.Provider value={{ post, setPost, categories, setCategories, tags, setTags }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
