import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { PostType } from "../interfaces";
import { ApiPost } from "../services/Api";
import { formateDate } from "../helpers/convert";

export default function BlogDetail() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const { blogid } = useParams();

    useEffect(() => {
        // Đặt lại vị trí cuộn về trên đầu trang khi component được mount
        window.scrollTo(0, 0);

        const fetchData = async (blogid: string) => {
            try {
                const posts: PostType[] = await ApiPost.getPost(blogid);
                console.log(posts);
                setPosts(posts);
            } catch (error) {
                // console.log(error);
            }
        };

        if (blogid) {
            fetchData(blogid);
        }

        // Đối với cleanup, ví dụ, nếu bạn muốn đặt lại vị trí cuộn khi component bị unmount
        return () => {
            window.scrollTo(0, 0);
        };
    }, [blogid]);

    return (
        <>
            {/* <!--================Blog Area =================--> */}
            {posts ? (
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 posts-list">
                                <div className="single-post row">
                                    <div className="col-lg-12">
                                        <div className="feature-img">
                                            <img
                                                className="img-fluid"
                                                src="/img/blog/feature-img1.jpg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3  col-md-3">
                                        <div className="blog_info text-right">
                                            <div className="post_tag">
                                                <a href="#">Food,</a>
                                                <a className="active" href="#">
                                                    Technology,
                                                </a>
                                                <a href="#">Politics,</a>
                                                <a href="#">Lifestyle</a>
                                            </div>
                                            <ul className="blog_meta list">
                                                <li>
                                                    <a href="#">
                                                        {posts[1].authorId.name}
                                                        <i className="lnr lnr-user"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {formateDate(
                                                            posts[1].createdAt
                                                        )}
                                                        <i className="lnr lnr-calendar-full"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {posts[1].views} Views
                                                        <i className="lnr lnr-eye"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        06 Comments
                                                        <i className="lnr lnr-bubble"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul className="social-links">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-github"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-behance"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-md-9 blog_details">
                                        <h2>{posts[1].title}</h2>
                                        <p className="excert">
                                            MCSE boot camps have its supporters
                                            and its detractors. Some people do
                                            not understand why you should have
                                            to spend money on boot camp when you
                                            can get the MCSE study materials
                                            yourself at a fraction.
                                        </p>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: posts[1].content,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="navigation-area">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                            {posts[0]?._id && (
                                                <>
                                                    <div className="thumb">
                                                        <Link
                                                            to={`/blog/${posts[0]._id}`}
                                                        >
                                                            <img
                                                                className="img-fluid"
                                                                src="/img/blog/prev.jpg"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="arrow">
                                                        <a href="#">
                                                            <span className="lnr text-white lnr-arrow-left"></span>
                                                        </a>
                                                    </div>
                                                    <div className="detials">
                                                        <p>Prev Post</p>
                                                        <Link
                                                            to={`/blog/${posts[0]._id}`}
                                                        >
                                                            <h4>
                                                                {posts[0].title}
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                            {posts[2]?._id && (
                                                <>
                                                    <div className="detials">
                                                        <p>Next Post</p>
                                                        <Link
                                                            to={`/blog/${posts[2]._id}`}
                                                        >
                                                            <h4>
                                                                {posts[2].title}
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                    <div className="arrow">
                                                        <Link to="#">
                                                            <span className="lnr text-white lnr-arrow-right"></span>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb">
                                                        <Link
                                                            to={`/blog/${posts[2]._id}`}
                                                        >
                                                            <img
                                                                className="img-fluid"
                                                                src="/img/blog/next.jpg"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="comments-area">
                                    <h4>05 Comments</h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img
                                                        src="/img/blog/c1.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5>
                                                        <a href="#">
                                                            Emilly Blunt
                                                        </a>
                                                    </h5>
                                                    <p className="date">
                                                        December 4, 2017 at 3:12
                                                        pm{" "}
                                                    </p>
                                                    <p className="comment">
                                                        Never say goodbye till
                                                        the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a
                                                    href=""
                                                    className="btn-reply text-uppercase"
                                                >
                                                    reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list left-padding">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img
                                                        src="/img/blog/c2.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5>
                                                        <a href="#">
                                                            Elsie Cunningham
                                                        </a>
                                                    </h5>
                                                    <p className="date">
                                                        December 4, 2017 at 3:12
                                                        pm{" "}
                                                    </p>
                                                    <p className="comment">
                                                        Never say goodbye till
                                                        the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a
                                                    href=""
                                                    className="btn-reply text-uppercase"
                                                >
                                                    reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list left-padding">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img
                                                        src="/img/blog/c3.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5>
                                                        <a href="#">
                                                            Annie Stephens
                                                        </a>
                                                    </h5>
                                                    <p className="date">
                                                        December 4, 2017 at 3:12
                                                        pm{" "}
                                                    </p>
                                                    <p className="comment">
                                                        Never say goodbye till
                                                        the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a
                                                    href=""
                                                    className="btn-reply text-uppercase"
                                                >
                                                    reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img
                                                        src="/img/blog/c4.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5>
                                                        <a href="#">
                                                            Maria Luna
                                                        </a>
                                                    </h5>
                                                    <p className="date">
                                                        December 4, 2017 at 3:12
                                                        pm{" "}
                                                    </p>
                                                    <p className="comment">
                                                        Never say goodbye till
                                                        the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a
                                                    href=""
                                                    className="btn-reply text-uppercase"
                                                >
                                                    reply
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img
                                                        src="/img/blog/c5.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5>
                                                        <a href="#">
                                                            Ina Hayes
                                                        </a>
                                                    </h5>
                                                    <p className="date">
                                                        December 4, 2017 at 3:12
                                                        pm{" "}
                                                    </p>
                                                    <p className="comment">
                                                        Never say goodbye till
                                                        the end comes!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a
                                                    href=""
                                                    className="btn-reply text-uppercase"
                                                >
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
                                        <a
                                            href="#"
                                            className="primary-btn primary_btn"
                                        >
                                            <span>Post Comment</span>
                                        </a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <Sidebar></Sidebar>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div style={{ height: window.innerHeight }}></div>
            )}

            {/* <!--================Blog Area =================--> */}
        </>
    );
}
