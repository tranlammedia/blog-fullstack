import { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";

import "./styles.css";
import { API_CLOUDINARY_URL, CLOUDINARY_PRESET } from "../../config/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    postSelect,
    updatePostState,
} from "../../redux/modules/postSlice";


Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const EditQuill = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);

    function handleChangeContent(newContent: string) {
        dispatch(updatePostState({ content: newContent }));
    }

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: 2 }, { font: [] }, { header: [2, 3, 4, false] }],
                [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    { script: "sub" },
                    { script: "super" },
                ],
                [{ color: [] }, { background: [] }, "blockquote", "code-block"],
                [
                    { align: [] },
                    { indent: "-1" },
                    { indent: "+1" },
                    { list: "ordered" },
                    { list: "bullet" },
                ],
                ["link", "image", "video"],
                [{ direction: "rtl" }, "clean"],
            ],
            imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
                handleStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                },
                displayStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                },
                toolbarStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                },
            },
            imageUploader: {
                upload: (file) => {
                    // return new Promise((resolve, reject) => {
                    //     const formData = new FormData();
                    //     formData.append("image", file);

                    //     fetch(
                    //         "https://api.imgbb.com/1/upload?key=bb203a4e08530038019bd1f9ebade9b8 ",
                    //         {
                    //             method: "POST",
                    //             body: formData,
                    //         }
                    //     )
                    //         .then((response) => response.json())
                    //         .then((result) => {
                    //             console.log(result);
                    //             resolve(result.data.url);
                    //         })
                    //         .catch((error) => {
                    //             reject("Upload failed");
                    //             console.error("Error:", error);
                    //         });
                    // });
                    console.log(file);
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", CLOUDINARY_PRESET); // Replace with your Cloudinary upload preset
                        formData.append("folder", "blog-fullstack");

                        fetch(API_CLOUDINARY_URL, {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                resolve(result.secure_url);
                            })
                            .catch((error) => {
                                reject("Upload failed");
                                console.error("Error:", error);
                            });
                    });
                },
            },
        }),
        []
    );

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "color",
        "code-block",
    ];

    return (
        <ReactQuill
            theme={"snow"}
            onChange={handleChangeContent}
            value={post.value[0]?.content || ""}
            modules={modules}
            formats={formats}
            placeholder={"Write something awesome..."}
            scrollingContainer="div"
            className="custom-quill"
        />
    );
};

export default EditQuill;
