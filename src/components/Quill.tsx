import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import QuillImageUploader from "quill-image-uploader";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", QuillImageUploader);

const EditQuill: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const [content, setContent] = useState(value);
  const [targetNode, setTargetNode] = useState(null);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };
  const domNodeRef = useRef(null);
  console.log(domNodeRef);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Xử lý khi có sự thay đổi trong cây DOM
      console.log("DOM changed!");
    });
    setTargetNode(domNodeRef.current);

    // Bắt đầu theo dõi
    if (targetNode) {
      observer.observe(targetNode, { childList: true });
    }

    // Ngừng theo dõi khi component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={domNodeRef}>
      {targetNode && (
        <ReactQuill
          value={content}
          onChange={handleChange}
          style={{ height: window.innerHeight * 0.5 }}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
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
                backgroundColor: 'black',
                border: 'none',
                color: "white"
                // other camelCase styles for size display
            },
            },
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
          ]}
        />
      )}
    </div>
  );
};

export default EditQuill;
