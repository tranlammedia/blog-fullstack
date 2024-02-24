import { API_CLOUDINARY_URL, CLOUDINARY_PRESET } from "../config/constants";

export const uploadImage = async (file) => {
    if (!file) return null; 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET); // Replace with your Cloudinary upload preset
    formData.append("folder", "blog-fullstack");
    const secure_url = fetch(API_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            
            return result.secure_url;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    return secure_url;
};
