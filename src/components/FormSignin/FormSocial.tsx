export default function FormSocial() {
    return (
        <>
            <div className="col-sm-5">
                <div className="card social-block">
                    <div className="card-body">
                        <button
                            className="btn btn-block btn-social btn-google"
                            onClick={() => console.log('"/auth/google"')}
                            role="button"
                        >
                            <i className="fab fa-google"></i>
                            Google
                        </button>
                        <button
                            className="btn btn-block btn-social btn-facebook"
                            onClick={() => console.log('"/auth/facebook"')}
                            role="button"
                        >
                            <i className="fab fa-facebook"></i>
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
