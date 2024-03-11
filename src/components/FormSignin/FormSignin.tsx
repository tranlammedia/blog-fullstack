import { ReactNode, useState } from "react";
import { ApiUser } from "../../services/Api";
import { useAuth } from "../../providers/useAuth";

export default function FormSignin({ children }: { children: ReactNode }) {
    const [requestBody, setRequestBody] = useState<{ [key: string]: string }>(
        {}
    );
    const { login }: any = useAuth();
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
    const [isExistEmail, setIsExistEmail] = useState(true);
    const [isCorrectPwd, setIsCorrectPwd] = useState(true);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    function handleRequestBody(event: React.ChangeEvent<HTMLInputElement>) {
        setRequestBody({
            ...requestBody,
            [event.target.name]: event.target.value,
        });
        // Check email format
        if (event.target.name === "email") {
            const isValid = emailRegex.test(event.target.value);
            setIsValidEmail(isValid);
        }
        // check length of password
        if (event.target.name === "password") {
            setIsValidPwd(event.target.value.length > 0);
        }
    }

    function handleSignIn(requestBody) {
        const fetch = async () => {
            try {
                const token = await ApiUser.loginUserJwt(requestBody);
                login(token);

                const dismissButton =
                    document.querySelector("#buttonFormSignin");
                if (dismissButton) {
                    dismissButton.dispatchEvent(
                        new Event("click", { bubbles: true })
                    );
                }
            } catch (error: any) {
                const { status } = error.response;

                // Tài khoản không tồn tại
                if (status === 404) setIsExistEmail(false);

                // Sai mật khẩu
                if (status === 401) {
                    setIsCorrectPwd(false);
                    setRequestBody({
                        ...requestBody,
                        password: "",
                    });
                    setIsValidPwd(false);
                }
            }
        };
        fetch();
    }
    return (
        <>
            <div className="modal" id="FormSignin">
                <div className="modal-dialog modal-dialog-centered width-form">
                    <div className="modal-content">
                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Đăng nhập</h4>
                            <button
                                id="buttonFormSignin"
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
                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        onChange={(e) =>
                                                            handleRequestBody(e)
                                                        }
                                                        value={
                                                            requestBody.email ||
                                                            ""
                                                        }
                                                    />
                                                    {requestBody?.email
                                                        ?.length > 3 &&
                                                        !isValidEmail && (
                                                            <small className="form-text text-danger">
                                                                Incorrect email
                                                            </small>
                                                        )}
                                                    {!isExistEmail && (
                                                        <small className="form-text text-danger">
                                                            Email không tồn tại
                                                        </small>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        onChange={(e) =>
                                                            handleRequestBody(e)
                                                        }
                                                        value={
                                                            requestBody.password ||
                                                            ""
                                                        }
                                                    />
                                                    {!isCorrectPwd && (
                                                        <small className="form-text text-danger">
                                                            Sai mật khẩu
                                                        </small>
                                                    )}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark"
                                                    onClick={() =>
                                                        handleSignIn(
                                                            requestBody
                                                        )
                                                    }
                                                    disabled={
                                                        !(
                                                            isValidEmail &&
                                                            isValidPwd
                                                        )
                                                    }
                                                >
                                                    Sign in
                                                </button>{" "}
                                                <span
                                                    // type="button"
                                                    className=" help-signin"
                                                    data-toggle="modal"
                                                    data-dismiss="modal"
                                                    data-target="#FormSignup"
                                                >
                                                    Chưa có tài khoản?
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <-- soccial  -->*/}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
