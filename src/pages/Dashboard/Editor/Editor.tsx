// App.js
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import EditQuill from "../../../components/EditQuill/EditQuill";
import NavRight from "../../../components/DashboardNav/NavRight";
import NavLeft from "../../../components/DashboardNav/NavLeft";
import "./Editor.css"; // Import file CSS tự tạo
import { ApiPost } from "../../../services/Api";
import { PostType } from "../../../interfaces";
import { useNavigate } from "react-router-dom";


const Editor = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    

    function handleChangeContent(content: string){
        setContent(content);
    };
    function handleChangeTitle(title: string) {
        setTitle(title);
    };
    function handleCheckDisableButton() {
        return !(content.length > 0 && title.length > 0);
    }
    function handlePost(status: "draft" | "publish") {
        if (status === "publish") {
            const newPost = {
                title: title,
                content: content,
                status: status,
            };
            const fetchData = async (newPost) => {
                try {
                    const post: PostType = await ApiPost.createPost(newPost);
                    console.log(post._id);
                    navigate("/blog/"+post._id)
                } catch (error) {
                    // console.log(error);
                }
            };
            fetchData(newPost);
            // ApiService.createPost(newPost);
        }
    }
    return (
        <>
            <section className="container-dashboard">
                <NavLeft />
                <EditQuill
                    value={content}
                    onChangeContent={handleChangeContent}
                    onChangeTitle={handleChangeTitle}
                />
                <NavRight
                    onPost={handlePost}
                    checkDisableButton={handleCheckDisableButton}
                ></NavRight>
            </section>
        </>
    );
};

export default Editor;
