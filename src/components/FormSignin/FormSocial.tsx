import { API_SERVER_URL } from "../../config/constants";

export default function FormSocial() {
    async function handleSignInGoogle() {
        window.location.href = `${API_SERVER_URL}/auth/google`;
    }

    async function handleSignInGitHub() {
        window.location.href = `${API_SERVER_URL}/auth/github`;
    }

    return (
        <>
            <div className="col-sm-5">
                <div className="card social-block">
                    <div className="card-body">
                        <button
                            className="btn btn-block btn-social btn-google"
                            onClick={() => handleSignInGoogle()}
                            role="button"
                        >
                            <i className="fab fa-google"></i>
                            Google
                        </button>
                        <button
                            className="btn btn-block btn-social btn-github"
                            onClick={() => handleSignInGitHub()}
                            role="button"
                        >
                            <i className="fab fa-github"></i>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
