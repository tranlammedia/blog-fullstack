import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./styles.css";

Quill.register("modules/imageResize", ImageResize);


interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EditQuill: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [content, setContent] = useState(value);
  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  const modules = {
    toolbar: [
      [{ header: 2 }, { font: [] }, { header: [2, 3, 4, false] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        { script: "sub" },
        { script: "super" }],[
        { color: [] },
        { background: [] },
        "blockquote",
        "code-block",
      ],
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

  return (
    <ReactQuill
      theme={"snow"}
      onChange={handleChange}
      value={content}
      modules={modules}
      formats={formats}
      placeholder={"Write something awesome..."}
    />
  );
};

export default EditQuill;
