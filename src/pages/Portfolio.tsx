import { useEffect } from "react";
import { Link } from "react-router-dom";
import Newsletter from "../components/Newsletter";

export default function Portfolio() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* <!--================Start Portfolio Area =================--> */}
            <section className="portfolio_area section_gap_top" id="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main_title text-left">
                                <h2>
                                    quality work <br />
                                    Recently done project{" "}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="filters portfolio-filter">
                        <ul>
                            <li className="active" data-filter="*">
                                all
                            </li>
                            <li data-filter=".popular">popular</li>
                            <li data-filter=".latest"> latest</li>
                            <li data-filter=".following">following</li>
                            <li data-filter=".upcoming">upcoming</li>
                        </ul>
                    </div>

                    <div className="filters-content">
                        <div className="row portfolio-grid justify-content-center">
                            <div className="col-lg-4 col-md-6 all latest">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p1.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p1.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">
                                                minimal design
                                            </Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all popular">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p2.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p2.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">Paint wall</Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all latest">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p3.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p3.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">
                                                female light
                                            </Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all popular">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p4.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p4.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">fourth air</Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all following">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p6.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p5.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">
                                                together sign
                                            </Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all upcoming">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p5.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p6.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">
                                                multiply fowl
                                            </Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all upcoming following">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p7.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p7.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">
                                                green heaven
                                            </Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all following">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p8.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p8.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>fly male</h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 all upcoming">
                                <div className="portfolio_box">
                                    <div className="single_portfolio">
                                        <img
                                            className="img-fluid w-100"
                                            src="img/portfolio/p9.jpg"
                                            alt=""
                                        />
                                        <div className="overlay"></div>
                                        <a
                                            href="img/portfolio/p9.jpg"
                                            className="img-gal"
                                        >
                                            <div className="icon">
                                                <span className="lnr lnr-cross"></span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="short_info">
                                        <h4>
                                            <Link to="detail">season face</Link>
                                        </h4>
                                        <p>Animated, portfolio</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================End Portfolio Area =================--> */}
            <Newsletter />
        </>
    );
}
