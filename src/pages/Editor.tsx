import { useState } from "react";
import EditQuill from "../components/EditQuill/EditQuill";
import { ApiService } from "../services/Api";
import { PostType } from "../interfaces";
export default function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  console.log(content);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }
  const handleContentChange = (content: string) => {
    setContent(content);
  };

  function handlePost(status: "draft" | "publish") {
    if (status === "publish") {
      const newPost = {
        title: title,
        content: content,
        status: status
      };
      const fetchData = async (newPost: PostType) => {
        try {
            const post: PostType = await ApiService.createPost(newPost);
            console.log(post)
        } catch (error) {
            // console.log(error);
        }
        fetchData(newPost);
    };
      ApiService.createPost(newPost);
    }
  }
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control form-control-sm"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(event)}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <EditQuill value={content} onChange={handleContentChange} />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <button
              type="button"
              className="btn btn-outline-danger mx-3"
              onClick={() => handlePost("draft")}
            >
              Save Draft
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePost("publish")}
            >
              Publish
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
