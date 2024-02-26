import { ReactNode, useState } from "react";
import { ApiUser } from "../../services/Api";
import { useAuth } from "../../providers/useAuth";

export default function FormSignup({ children }: { children: ReactNode }) {
    const { login }: any = useAuth();
    const [requestBody, setRequestBody] = useState<{ [key: string]: string }>(
        {}
    );
    const [showModal, setShowModal] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isExistEmail, setIsExistEmail] = useState(false);

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
    }

    function handleSubmit(requestBody) {
        const fetch = async () => {
            try {
                const token = await ApiUser.createUser(requestBody);
                await login(token);
                // setShowModal(false)
                const dismissButton =
                    document.querySelector("#buttonFormSignup");
                
                if (dismissButton) {
                    console.log(dismissButton);
                    dismissButton.dispatchEvent(
                        new Event("click", { bubbles: true })
                    );
                }

                // setIsExistEmail(false);
            } catch (error: any) {
                if (error.response.status === 409) {
                    setIsExistEmail(true);
                }
            }
        };
        fetch();
    }

    return (
        <>
            <div className="modal" id="FormSignup">
                <div className="modal-dialog modal-dialog-centered width-form">
                    <div className="modal-content">
                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Đăng Ký</h4>
                            <button
                                id="buttonFormSignup"
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
                                                    <label htmlFor="password">
                                                        Your name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        onChange={(e) =>
                                                            handleRequestBody(e)
                                                        }
                                                        defaultValue={
                                                            requestBody.name ||
                                                            ""
                                                        }
                                                    />
                                                </div>
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
                                                        defaultValue={
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

                                                    {isExistEmail && (
                                                        <small className="form-text text-danger">
                                                            Email đã tồn tại
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
                                                        defaultValue={
                                                            requestBody.password ||
                                                            ""
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark"
                                                    onClick={() =>
                                                        handleSubmit(
                                                            requestBody
                                                        )
                                                    }
                                                >
                                                    Sign up
                                                </button>{" "}
                                                <span
                                                    // type="button"
                                                    className=" help-signin"
                                                    data-toggle="modal"
                                                    data-dismiss="modal"
                                                    data-target="#FormSignin"
                                                >
                                                    Đã có tài khoản?
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
