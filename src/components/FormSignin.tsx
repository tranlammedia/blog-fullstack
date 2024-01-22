export default function FormSignin() {
    return (
        <div className="modal" id="FormSignin">
            <div className="modal-dialog modal-dialog-centered">
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
                        {/* <!-- Registration Form --> */}
                        <form id="registrationForm">
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
