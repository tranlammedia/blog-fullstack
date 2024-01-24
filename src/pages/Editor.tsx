import  { useState } from "react";
import Quill from "../components/Quill";
import EditQuill from "../components/EditQuill/Editor";
export default function Editor() {
  const [content, setContent] = useState("");
    console.log(content);
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  

  return (
    <>
      <section className="section_gap">
        {/* <Tiptap /> */}
        <EditQuill value={content} onChange={handleContentChange}/>
        {/* <Quill value={content} onChange={handleContentChange}></Quill> */}
      </section>
    </>
  );
}
