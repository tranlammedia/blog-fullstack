export function Comment() {
    return (
        <>
            <div className="comments-area">
                <h4>05 Comments</h4>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c1.jpg" alt="" />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Emilly Blunt</a>
                                </h5>
                                <p className="date">
                                    December 4, 2017 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">
                                reply
                            </a>
                        </div>
                    </div>
                </div>
                <div className="comment-list left-padding">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c2.jpg" alt="" />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Elsie Cunningham</a>
                                </h5>
                                <p className="date">
                                    December 4, 2017 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">
                                reply
                            </a>
                        </div>
                    </div>
                </div>
                <div className="comment-list left-padding">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c3.jpg" alt="" />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Annie Stephens</a>
                                </h5>
                                <p className="date">
                                    December 4, 2017 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">
                                reply
                            </a>
                        </div>
                    </div>
                </div>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c4.jpg" alt="" />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Maria Luna</a>
                                </h5>
                                <p className="date">
                                    December 4, 2017 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">
                                reply
                            </a>
                        </div>
                    </div>
                </div>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c5.jpg" alt="" />
                            </div>
                            <div className="desc">
                                <h5>
                                    <a href="#">Ina Hayes</a>
                                </h5>
                                <p className="date">
                                    December 4, 2017 at 3:12 pm{" "}
                                </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">
                                reply
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-form">
                <h4>Leave a Reply</h4>
                <form>
                    <div className="form-group form-inline">
                        <div className="form-group col-lg-6 col-md-6 name">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 email">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email address"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control mb-10"
                            rows={5}
                            name="message"
                            placeholder="Messege"
                        ></textarea>
                    </div>
                    <a href="#" className="primary-btn primary_btn">
                        <span>Post Comment</span>
                    </a>
                </form>
            </div>
        </>
    );
}
