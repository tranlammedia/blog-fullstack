import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderDashboardProps {
    onShowNavLeft: (show: boolean) => void
}

export default function HeaderDashboard() {
    const navigate = useNavigate();
    const [showNavLeft, setShowNavLeft] = useState(true);

    const toggleNavLeft = () => {
        setShowNavLeft(!showNavLeft);
        navigate(".", { state: { showNavLeft: !showNavLeft } });
    };

    return (
        <header className={`header_area navbar_fixed`}>
            <div className="main_menu">
                <nav className="navbar  navbar-light">
                    <div className="container-header">
                        <div>
                            <button
                                className="navbar-toggler"
                                type="button"
                                onClick={toggleNavLeft}
                            >
                                <i
                                    className={`fas fa-bars icon-toggle ${
                                        showNavLeft ? "icon-toggle-move" : ""
                                    } `}
                                ></i>
                            </button>

                            <Link className="navbar-brand" to="/dashboard">
                                <div className="logo-container text-white mx-3">
                                    Dashboard
                                </div>
                            </Link>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary">
                                My Name
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
