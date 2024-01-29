import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./styles.css";
import { useLocation } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

interface TextEditorProps {
    value: string;
    onChangeContent: (value: string) => void;
    onChangeTitle: (value: string) => void;
}

const modules = {
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
};

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

const EditQuill: React.FC<TextEditorProps> = ({ value, onChangeContent, onChangeTitle }) => {
    const location = useLocation();
    
    const [showNavLeft, setShowNavLeft] = useState(true);
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

    function handleChangeContent(newContent: string){
        setContent(newContent);
        onChangeContent(newContent);
    };

    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>){
        setTitle(event.target.value);
        onChangeTitle(event.target.value);
    };

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
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => handleChangeTitle(event)}
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
