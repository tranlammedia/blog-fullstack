import { Link } from "react-router-dom";
import { useShowNavLeft } from "../../providers/useShowNavLeft";


export default function HeaderDashboard() {
    const {showNavLeft, setShowNavLeft} : any = useShowNavLeft();

    const toggleNavLeft = () => {
        setShowNavLeft(!showNavLeft);
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
