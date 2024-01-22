export default function Footer() {

    return (
        <>
            <footer className="footer_area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="footer_top flex-column">
                                <div className="footer_logo">
                                    <a href="#">
                                        <img src="img/logo.png" alt="" />
                                    </a>
                                    <h4>Follow Me</h4>
                                </div>
                                <div className="footer_social">
                                    <a
                                        href="https://www.linkedin.com/in/tranledienlam/"
                                        target="blank"
                                    >
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                    <a
                                        href="https://github.com/tranledienlam"
                                        target="blank"
                                    >
                                        <i className="fa fa-github"></i>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/tranledienlam"
                                        target="blank"
                                    >
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/channel/UCK_WJZUMybvHeK-vcFYOx6w"
                                        target="blank"
                                    >
                                        <i className="fa fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row footer_bottom justify-content-center">
                            <p className="col-lg-12 col-sm-12 footer-text">
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                                Copyright &copy;{new Date().getFullYear()} |
                                This template is edited from{" "}
                                <a href="https://colorlib.com" target="_blank">
                                    Colorlib
                                </a>{" "}
                                by{" "}
                                <i
                                    className="fa fa-heart-o"
                                    aria-hidden="true"
                                ></i>{" "}
                                TranLam
                                <br />
                                <span>Email: lam.tranledien@gmail.com</span>
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
