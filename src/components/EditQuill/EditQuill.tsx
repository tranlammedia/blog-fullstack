import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";

import "./styles.css";
import { useLocation } from "react-router-dom";
import { useShowNavLeft } from "../../providers/useShowNavLeft";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

interface TextEditorProps {
    value: string;
    onChangeContent: (value: string) => void;
    onChangeTitle: (value: string) => void;
}

const EditQuill: React.FC<TextEditorProps> = ({
    value,
    onChangeContent,
    onChangeTitle,
}) => {
    const location = useLocation();

    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const [showNavRight, setShowNavRight] = useState(true);
    const [content, setContent] = useState(value);
    const [title, setTitle] = useState(value);

    useEffect(() => {
        if (location.state?.showNavLeft != undefined) {
            setShowNavLeft(location.state?.showNavLeft);
        }
        if (location.state?.showNavRight != undefined) {
            setShowNavRight(location.state?.showNavRight);
        }
    }, [location.state?.showNavLeft, location.state?.showNavRight]);

    function handleChangeContent(newContent: string) {
        setContent(newContent);
        onChangeContent(newContent);
    }

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        onChangeTitle(event.target.value);
    }

    function handleUploadImage(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            fetch(
                "https://api.imgbb.com/1/upload?key=bb203a4e08530038019bd1f9ebade9b8 ",
                {
                    method: "POST",
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    resolve(result.data.url);
                })
                .catch((error) => {
                    reject("Upload failed");
                    console.error("Error:", error);
                });
        });
    }

    async function handleUploadImage1(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "hknulgyy"); // Replace with your Cloudinary upload preset

            fetch("https://api.cloudinary.com/v1_1/dgdi4xbyp/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    resolve(result.secure_url);
                })
                .catch((error) => {
                    reject("Upload failed");
                    console.error("Error:", error);
                });
        });
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
                modules: ["Resize", "DisplaySize", "Toolbar"],
                handleStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                    // other camelCase styles for size display
                },
                displayStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                    // other camelCase styles for size display
                },
                toolbarStyles: {
                    backgroundColor: "black",
                    border: "none",
                    color: "white",
                    // other camelCase styles for size display
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
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", "hknulgyy"); // Replace with your Cloudinary upload preset
                        formData.append("folder", "blog-fullstack");

                        fetch(
                            "https://api.cloudinary.com/v1_1/dgdi4xbyp/upload",
                            {
                                method: "POST",
                                body: formData,
                            }
                        )
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(result);
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
        <div
            className={`main-content ${showNavLeft ? "open-left" : ""} ${
                showNavRight ? "open-right" : ""
            }`}
        >
            <div className="edit d-flex flex-column">
                <h2>Bài viết mới</h2>
                <div className="form-group">
                    <label>Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChangeTitle(event)}
                        defaultValue={title}
                    />
                </div>
                <div className="form-group">
                    <label>Nội dung</label>
                    <ReactQuill
                        theme={"snow"}
                        onChange={handleChangeContent}
                        value={content}
                        modules={modules}
                        formats={formats}
                        placeholder={"Write something awesome..."}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditQuill;
