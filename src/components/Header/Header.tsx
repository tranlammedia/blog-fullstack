import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import FormSignin from "../FormSignin";

export default function Header() {
    const [isNavbarFixed, setNavbarFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            if (scroll >= 50) {
                setNavbarFixed(true);
            } else {
                setNavbarFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`header_area ${isNavbarFixed ? "navbar_fixed" : ""}`}
        >
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                        <Link className="navbar-brand logo_h" to="/">
                            <div className="logo-container">
                                <img src="/img/logo.png" alt="" />
                            </div>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div
                            className="collapse navbar-collapse offset"
                            id="navbarSupportedContent"
                        >
                            <ul className="nav navbar-nav menu_nav justify-content-end">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">Home</span>
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">About</span>
                                </NavLink>
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">Services</span>
                                </NavLink>
                                <NavLink
                                    to="/portfolio"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">Portfolio</span>
                                </NavLink>
                                <NavLink
                                    to="/blog"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">Blog</span>
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                >
                                    <span className="nav-link">Contact</span>
                                </NavLink>
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <button
                                        type="button"
                                            className="btn btn-primar"
                                            data-toggle="modal"
                                            data-target="#FormSignin"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
                
            </div>
        </header>
    );
}
