import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";

import "./styles.css";
import { useShowNavLeft } from "../../providers/useShowNavLeft";
import { API_CLOUDINARY_URL, CLOUDINARY_PRESET } from "../../config/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    clearPostState,
    getPostFetch,
    postSelect,
    updatePostState,
} from "../../redux/modules/postSlice";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const EditQuill = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const [showNavRight, setShowNavRight] = useState(true);
    const [lengthTitle, setLengthTitle] = useState(120);
    const { blogid } = useParams();

    useEffect(() => {
        if (blogid) {
            dispatch(getPostFetch(blogid));
        }
    }, []);

    useEffect(() => {
        if (post.value[0]) {
            setLengthTitle(120 - post.value[0]?.title?.length || 120);
        }
    }, [post.value[0]]);

    useEffect(() => {
        if (location.state?.showNavLeft != undefined) {
            setShowNavLeft(location.state?.showNavLeft);
        }
        if (location.state?.showNavRight != undefined) {
            setShowNavRight(location.state?.showNavRight);
        }
    }, [location.state?.showNavLeft, location.state?.showNavRight]);

    function handleChangeContent(newContent: string) {
        dispatch(updatePostState({ content: newContent }));
    }

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const title = event.target.value;
        if (title?.length <= 120) {
            dispatch(updatePostState({ title }));
        }
    }

    const hanleClearPostState = () => {
        dispatch(clearPostState());
    };

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
        <div
            className={`main-content main-content-mr ${
                showNavLeft ? "open-left" : ""
            } ${showNavRight ? "open-right" : ""}`}
        >
            <div className="edit d-flex flex-column">
                <div className="d-flex justify-content-between">

                {blogid || post.value[0]?._id ? (
                    <h2>Cập nhật bài viết</h2>
                ) : (
                    <h2>Bài viết mới</h2>
                )}
                {!blogid && (
                    <button className="btn btn-danger" onClick={hanleClearPostState}>Clear</button>
                )}
                </div>
                <div className="form-group">
                    <div className="d-flex justify-content-between">
                        <label>Tiêu đề</label>
                        <label>{lengthTitle}/120</label>
                    </div>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChangeTitle(event)}
                        value={post.value[0]?.title || ""}
                    />
                </div>
                <div className="form-group">
                    <label>Nội dung</label>
                    <ReactQuill
                        theme={"snow"}
                        onChange={handleChangeContent}
                        value={post.value[0]?.content || ""}
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
