import { Link, useNavigate } from "react-router-dom";
import { useShowNavLeft } from "../../providers/useShowNavLeft";
import { useAuth } from "../../providers/useAuth";

export default function HeaderDashboard() {
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const { userLogin, logout }: any = useAuth();

    const toggleNavLeft = () => {
        setShowNavLeft(!showNavLeft);
    };

    const handleSignOut = () => {
        logout();
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
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary "
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {userLogin?.name || userLogin?.username}
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-custom-dashboard"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <Link
                                        className="dropdown-item dropdown-name divider"
                                        to="/"
                                    >
                                        Go to Home
                                    </Link>
                                    <Link
                                        className="dropdown-item dropdown-name"
                                        to="/"
                                        onClick={handleSignOut}
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
