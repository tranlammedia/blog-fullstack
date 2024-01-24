import  { useState } from "react";
import EditQuill from "../components/EditQuill/EditQuill";
export default function Editor() {
  const [content, setContent] = useState("");
    console.log(content);
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  

  return (
    <>
      <section className="section_gap">
      <EditQuill value={content} onChange={handleContentChange}/>
        {/* <Editor value={content} onChange={handleContentChange}/> */}
      </section>
    </>
  );
}
