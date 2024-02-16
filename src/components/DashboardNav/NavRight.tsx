import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import DraftIcon from "../icons/DraftIcon";
import PublishIcon from "../icons/PublishIcon";
import FileTextIcon from "../icons/FileTextIcon";
import TagIcon from "../icons/TagIcon";
import ImgIcon from "../icons/ImgIcon";
import { useEditor } from "../../providers/useEditor";
import { PostType } from "../../interfaces";
import { ApiPost } from "../../services/Api";
import { htmltostring } from "../../helpers/convert";
import { uploadImage } from "../../helpers/uploadImage";
import CaretLeftIcon from "../icons/CaretLeftIcon";
import CaretRightIcon from "../icons/CaretRightIcon";
import CategoryIcon from "../icons/CategoryIcon";
import OptionCategory from "./OptionCategory";
import OptionTag from "./OptionTag";

export default function NavRight() {
    const navigate = useNavigate();
    const [showNavRight, setShowNavRight] = useState(true);

    const { post, setPost }: any = useEditor();

    const [lengthDescShort, setLengthDescShort] = useState(300);
    const [featuredImage, setFeaturedImage] = useState({
        file: "",
        url: post?.featureImageUrl,
    });

    function toggleNavRight() {
        setShowNavRight(!showNavRight);
        navigate(".", { state: { showNavRight: !showNavRight } });
    }
    async function handleButtonPost(status: "draft" | "publish") {
        const featureImageUrl = await uploadImage(featuredImage.file);

        const newPost = {
            ...post,
            status: status,
            featureImageUrl: featureImageUrl,
            description: !post.description
                ? htmltostring(post.content)
                : post.description,
        };
        const fetchData = async (newPost) => {
            try {
                const post: PostType = await ApiPost.createPost(newPost);
                navigate("/blog/" + post._id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(newPost);
    }

    function handleCheckDisableButton() {
        return !(post?.content?.length > 0 && post?.title?.length > 0);
    }

    const handleDescShort = (e) => {
        const description = e.target.value;

        if (description.length <= 300) {
            setPost({
                ...post,
                description,
            });
            setLengthDescShort(300 - description.length);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFeaturedImage({
                file: file,
                url: imageUrl,
            });
        }
    };

    return (
        <div
            className={` nav-right sidebar-right ${
                showNavRight ? "open-right" : ""
            }`}
        >
            {showNavRight ? (
                // true
                <>
                    <div className="">
                        <button
                            className="btn "
                            type="button"
                            onClick={toggleNavRight}
                        >
                            <CaretRightIcon size={16} />
                        </button>
                        <div className="d-flex flex-column">
                            <div className="divider"></div>
                            <div className="d-flex justify-content-around align-items-center flex-wrap p-1 my-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm my-1"
                                    onClick={() => handleButtonPost("draft")}
                                    disabled={handleCheckDisableButton()}
                                >
                                    Draft
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm my-1"
                                    onClick={() => handleButtonPost("publish")}
                                    disabled={handleCheckDisableButton()}
                                >
                                    Publish
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="d-flex flex-column">
                                <div>
                                    <a
                                        className="btn border-bottom collapse-right text-left d-flex align-items-center gap-icon-label"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#descShort"
                                    >
                                        <FileTextIcon />
                                        Mô tả
                                    </a>
                                    <div className="collapse " id="descShort">
                                        <div className="m-2">
                                            <textarea
                                                rows={3}
                                                className="input-nav-right input-text"
                                                placeholder="Mô tả ngắn nội dung"
                                                onChange={(e) =>
                                                    handleDescShort(e)
                                                }
                                                value={post?.description || ""}
                                            />
                                            <label>{lengthDescShort}/300</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="btn border-bottom collapse-right text-left d-flex align-items-center gap-icon-label"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#categories"
                                    >
                                        <CategoryIcon />
                                        <span>Chủ đề</span>
                                    </a>
                                    <div className="collapse " id="categories">
                                        <div className="m-2">
                                            <OptionCategory />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="btn border-bottom collapse-right text-left d-flex align-items-center gap-icon-label"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#tags"
                                    >
                                        <TagIcon />
                                        <span>Tags</span>
                                    </a>
                                    <div className="collapse " id="tags">
                                        <div className="m-2">
                                            <OptionTag />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a
                                        className="btn border-bottom collapse-right text-left d-flex align-items-center gap-icon-label"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#featuredImage"
                                    >
                                        <ImgIcon />
                                        <span>Feature Image</span>
                                    </a>
                                    <div
                                        className="collapse "
                                        id="featuredImage"
                                    >
                                        <div className="m-2">
                                            <label
                                                htmlFor="upload-image"
                                                className="custom-file-upload"
                                            >
                                                <input
                                                    id="upload-image"
                                                    type="file"
                                                    className="input-nav-right visually-hidden"
                                                    onChange={handleImageUpload}
                                                />
                                                Upload Image
                                            </label>
                                            <img
                                                src={
                                                    featuredImage.url ||
                                                    "https://via.placeholder.com/550x280"
                                                }
                                                alt="Featured Image"
                                                className="featured-image-review"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // false
                <>
                    <div className="">
                        <button
                            className="btn "
                            type="button"
                            onClick={toggleNavRight}
                        >
                            <CaretLeftIcon size={16} />
                        </button>
                        <div className="d-flex flex-column">
                            <div className="divider"></div>
                            <div className="d-flex flex-column-reverse my-2 ">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm my-1"
                                    style={{ fontSize: "0.8rem" }}
                                    disabled={handleCheckDisableButton()}
                                >
                                    <DraftIcon />
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm my-1"
                                    style={{ fontSize: "0.8rem" }}
                                    disabled={handleCheckDisableButton()}
                                >
                                    <PublishIcon />
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="d-flex flex-column">
                                <a
                                    className={`btn border-bottom collapse-right ${
                                        showNavRight && "text-left"
                                    }`}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#descShort"
                                    onClick={toggleNavRight}
                                >
                                    <FileTextIcon />
                                </a>
                                <a
                                    className={`btn border-bottom collapse-right ${
                                        showNavRight && "text-left"
                                    }`}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#categories"
                                    onClick={toggleNavRight}
                                >
                                    <CategoryIcon />
                                </a>
                                <a
                                    className={`btn border-bottom collapse-right ${
                                        showNavRight && "text-left"
                                    }`}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#tags"
                                    onClick={toggleNavRight}
                                >
                                    <TagIcon />
                                </a>
                                <a
                                    className={`btn border-bottom collapse-right ${
                                        showNavRight && "text-left"
                                    }`}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#featuredImage"
                                    onClick={toggleNavRight}
                                >
                                    <ImgIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
