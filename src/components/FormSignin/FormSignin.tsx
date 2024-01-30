import "./FormSignin.css";

export default function FormSignin() {
    return (
        <div className="modal" id="FormSignin">
            <div className="modal-dialog modal-dialog-centered width-form">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Đăng Ký</h4>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                        >
                            &times;
                        </button>
                    </div>

                    {/* <!-- Modal Body --> */}
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="card">
                                    <div className="card-body">
                                        <form action="/register" method="POST">
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="username"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-dark"
                                            >
                                                Register
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-5">
                                <div className="card social-block">
                                    <div className="card-body">
                                        <button
                                            className="btn btn-block btn-social btn-google"
                                            onClick={() =>
                                                console.log('"/auth/google"')
                                            }
                                            role="button"
                                        >
                                            <i className="fab fa-google"></i>
                                            Sign Up with Google
                                        </button>
                                        <button
                                            className="btn btn-block btn-social btn-facebook"
                                            onClick={() =>
                                                console.log('"/auth/facebook"')
                                            }
                                            role="button"
                                        >
                                            <i className="fab fa-facebook"></i>
                                            Sign Up with Facebook
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/* <!-- Registration Form --> */}
                        {/* <form id="registrationForm">
                            <div className="form-group">
                                <label htmlFor="regUsername">
                                    Tên đăng nhập:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="regUsername"
                                    name="regUsername"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="regPassword">Mật khẩu:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="regPassword"
                                    name="regPassword"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Đăng Ký
                            </button>
                        </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
