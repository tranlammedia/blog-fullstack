import React, { useState } from "react";
import ReactQuill from "react-quill";
import { EditorToolbar, modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
  }

export const EditQuill: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [content, setContent] = useState(value);
  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent)
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default EditQuill;
