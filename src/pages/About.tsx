import { useEffect } from "react";
import Newsletter from "../components/Newsletter";

export function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* <!--================ Start About Us Area =================--> */}
            <section className="about_area section_gap">
                <div className="container">
                    <div className="row justify-content-start align-items-center">
                        <div className="col-lg-5">
                            <div className="about_img">
                                <img
                                    className=""
                                    src="img/about-us.png"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="offset-lg-1 col-lg-5">
                            <div className="main_title text-left">
                                <h2>
                                    let’s <br />
                                    Introduce about <br />
                                    myself
                                </h2>
                                <p>
                                    Whose given. Were gathered. There first
                                    subdue greater. Bearing you Whales heaven
                                    midst their. Beast creepeth. Fish days.
                                </p>
                                <p>
                                    Is give may shall likeness made yielding
                                    spirit a itself together created after sea
                                    is in beast beginning signs open god you're
                                    gathering whose gathered cattle let.
                                    Creature whales fruit unto meat the life
                                    beginning all in under give two.
                                </p>
                                <a className="primary_btn" href="#">
                                    <span>Download CV</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================ End About Us Area =================--> */}

            {/* <!--================ Srart Brand Area =================--> */}
            <section className="brand_area section_gap_bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo1.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo2.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo3.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo4.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo5.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo6.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo7.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo8.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-brand-item d-table">
                                        <div className="d-table-cell text-center">
                                            <img
                                                src="img/brands/logo9.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="offset-lg-2 col-lg-4 col-md-6">
                            <div className="client-info">
                                <div className="d-flex mb-50">
                                    <span className="lage">10</span>
                                    <span className="smll">
                                        Years Experience Working
                                    </span>
                                </div>
                                <div className="call-now d-flex">
                                    <div>
                                        <span className="fa fa-phone"></span>
                                    </div>
                                    <div className="ml-15">
                                        <p>call us now</p>
                                        <h3>(+1)-800-555-6789</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================ End Brand Area =================--> */}

            {/* <!--================ Start Testimonial Area =================--> */}
            <div className="testimonial_area section_gap_bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="main_title">
                                <h2>client say about me</h2>
                                <p>
                                    Is give may shall likeness made yielding
                                    spirit a itself togeth created after sea is
                                    in beast <br />
                                    beginning signs open god you're gathering
                                    ithe
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="testi_slider owl-carousel">
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Elite Martin</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t2.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Davil Saden</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Elite Martin</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t2.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Davil Saden</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Elite Martin</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testi_item">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img
                                            src="img/testimonials/t2.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="testi_text">
                                            <h4>Davil Saden</h4>
                                            <p>
                                                Him, made can't called over
                                                won't there on divide there male
                                                fish beast own his day third
                                                seed sixth seas unto. Saw from{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--================ End Testimonial Area =================--> */}
            <Newsletter />
        </>
    );
}
export default About;
