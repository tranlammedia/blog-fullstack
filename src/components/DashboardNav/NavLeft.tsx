import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useShowNavLeft } from "../../providers/useShowNavLeft";

export default function NavLeft() {
    const location = useLocation();
    
    const {showNavLeft, setShowNavLeft} : any = useShowNavLeft();

    useEffect(() => {
        if (location.state?.showNavLeft != undefined) {
            setShowNavLeft(location.state?.showNavLeft);
        }
      }, [location.state?.showNavLeft]);

    return (
        <div className={`nav-left ${showNavLeft ? "open-left" : ""}`}>
                    <ul className="nav navbar-nav menu_nav justify-content-center">
                        <NavLink
                            to="/dashboard/new"
                            className={({ isActive }) =>
                                `nav-item btn border-bottom text-muted ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <span className="nav-link">New Post</span>
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
                            to="/dashboard/users"
                            className={({ isActive }) =>
                                `nav-item btn border-bottom text-muted ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <span className="nav-link">Quản lý thành viên</span>
                        </NavLink>
                    </ul>
                    <li className="nav-item signout-btn mt-5">
                        <div className="nav-link">
                            <button
                                type="button"
                                className="btn btn-primar"
                                data-toggle="modal"
                                data-target="#FormSignin"
                            >
                                Sign out
                            </button>
                        </div>
                    </li>
                </div>
    )
}