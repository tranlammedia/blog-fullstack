import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import EditQuill from "../../../components/EditQuill/EditQuill";
import NavRight from "../../../components/DashboardNav/NavRight";
import NavLeft from "../../../components/DashboardNav/NavLeft";
import { useShowNavLeft } from "../../../providers/useShowNavLeft";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    clearPostState,
    getPostFetch,
    postSelect,
    updatePostState,
} from "../../../redux/modules/postSlice";
import "./Editor.css"; 
import JoditEditor from "../../../components/EditQuill/JoditEditor";

const Editor = () => {
    const location = useLocation();
    const { blogid } = useParams();
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const [showNavRight, setShowNavRight] = useState(true);
    const [lengthTitle, setLengthTitle] = useState(120);

    // const handleScroll = () => {
    //     setScrollPosition(window.scrollY);
    // };
    useEffect(() => {
        if (blogid) {
            dispatch(getPostFetch(blogid));
        }
        // window.addEventListener("scroll", handleScroll);
        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
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


    function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const title = event.target.value;
        if (title?.length <= 120) {
            dispatch(updatePostState({ title }));
        }
    }

    const hanleClearPostState = () => {
        dispatch(clearPostState());
    };
    return (
        <section className="container-dashboard">
            <NavLeft />
            <div
                className={`main-content main-content-mr ${
                    showNavLeft ? "open-left" : ""
                } ${showNavRight ? "open-right" : ""}`}
            >
                <div className="area-edit d-flex flex-column">
                    <div className="form-group">
                        <div className="d-flex justify-content-between">
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input-title"
                                placeholder="Tiêu đề... "
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => handleChangeTitle(event)}
                                value={post.value[0]?.title || ""}
                            />
                            <label className="title-edit">
                                {lengthTitle}/120
                            </label>
                            {!blogid && (
                                <button
                                    className="btn btn-danger"
                                    onClick={hanleClearPostState}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        {/* <EditQuill /> */}
                        <JoditEditor />
                    </div>
                </div>
            </div>
            <NavRight></NavRight>
        </section>
    );
};

export default Editor;
