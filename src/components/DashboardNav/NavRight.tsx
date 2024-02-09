import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavRight({ onPost, checkDisableButton }) {
    const navigate = useNavigate();
    const [showNavRight, setShowNavRight] = useState(true);
    const [tags, setTags] = useState("");

    function toggleNavRight() {
        setShowNavRight(!showNavRight);
        navigate(".", { state: { showNavRight: !showNavRight } });
    }
    function handlePost(status: "draft" | "publish") {
        onPost(status);
    }

    return (
        <div className={` nav-right ${showNavRight ? "open-right" : ""}`}>
            {showNavRight ? (
                // true
                <>
                    <div className="">
                        <button
                            className="btn "
                            type="button"
                            onClick={toggleNavRight}
                        >
                            {">>"}
                        </button>
                        <div className="d-flex flex-column">
                            <div className="divider"></div>
                            <div className="d-flex justify-content-around align-items-center flex-wrap p-1 my-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm my-1"
                                    onClick={() => handlePost("draft")}
                                    disabled={checkDisableButton()}
                                >
                                    Draft
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm my-1"
                                    onClick={() => handlePost("publish")}
                                    disabled={checkDisableButton()}
                                >
                                    Publish
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="d-flex flex-column">
                                <a
                                    className="btn border-bottom collapse-right  text-left"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#tags"
                                >
                                    Tags
                                </a>
                                <div className="collapse " id="tags">
                                    <div className="m-2">
                                        <input
                                            type="text"
                                            className="input-nav-right"
                                            onChange={(e) =>
                                                setTags(e.target.value)
                                            }
                                            defaultValue={tags || ""}
                                        />
                                        <small>
                                            tags: tài chính, sức khỏe...
                                        </small>
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
                            {"<<"}
                        </button>
                        <div className="d-flex flex-column">
                            <div className="divider"></div>
                            <div className="d-flex flex-column-reverse my-2 ">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm my-1"
                                    style={{ fontSize: "0.8rem" }}
                                    disabled={checkDisableButton()}
                                >
                                    Draft
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm my-1"
                                    style={{ fontSize: "0.8rem" }}
                                    disabled={checkDisableButton()}
                                >
                                    Publish
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="d-flex flex-column">
                                <a
                                    className="btn border-bottom collapse-right  text-left"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#tags"
                                    onClick={toggleNavRight}
                                >
                                    Tags
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
