import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useShowNavLeft } from "../../providers/useShowNavLeft";

export default function NavLeft() {
    const location = useLocation();
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    
    useEffect(() => {
        if (location.state?.showNavLeft != undefined) {
            setShowNavLeft(location.state?.showNavLeft);
        }
    }, [location.state?.showNavLeft]);

    return (
        <div
            className={`nav-left sidebar-left ${
                showNavLeft ? "open-left" : ""
            }`}
        >
            <ul className="nav navbar-nav menu_nav justify-content-center">
                <NavLink
                    to={"/dashboard/new"}
                    className={({ isActive }) =>
                        `nav-item btn border-bottom text-muted ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span className="nav-link">Soạn Bài viết</span>
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `nav-item btn border-bottom text-muted ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span className="nav-link">Danh sách Bài viết</span>
                </NavLink>
                <NavLink
                    to="/dashboard/category"
                    className={({ isActive }) =>
                        `nav-item btn border-bottom text-muted ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span className="nav-link">Quản lý Danh mục</span>
                </NavLink>
            </ul>
        </div>
    );
}
