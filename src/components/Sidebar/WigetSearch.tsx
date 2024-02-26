import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WigetSearch() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const handleClick = () => {
        navigate(`/blog?search=${searchText}`);
        setSearchText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };
    return (
        <aside className="single_sidebar_widget search_widget">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Posts"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => handleClick()}
                    >
                        <i className="lnr lnr-magnifier"></i>
                    </button>
                </span>
            </div>
            {/* <!-- /input-group --> */}
            <div className="br"></div>
        </aside>
    );
}
