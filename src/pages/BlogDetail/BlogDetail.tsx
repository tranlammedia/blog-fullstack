import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { PostType } from "../../interfaces";
import { ApiPost } from "../../services/Api";
import { formateDate } from "../../helpers/convert";
import "./styles.css"


export default function BlogDetail() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const { blogid } = useParams();

    useEffect(() => {
        // Đặt lại vị trí cuộn về trên đầu trang khi component được mount
        window.scrollTo(0, 0);

        const fetchData = async (blogid: string) => {
            try {
                const posts: PostType[] = await ApiPost.getPost(blogid);
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

                                            {posts[1].featureImageUrl && (
                                                <img
                                                    className="feature-img-custom"
                                                    src={posts[1].featureImageUrl}
                                                    alt=""
                                                />

                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-3  col-md-3">
                                        <div className="blog_info text-right">
                                            {/* <div className="post_tag">
                                                <a href="#">Food,</a>
                                                <a className="active" href="#">
                                                    Technology,
                                                </a>
                                                <a href="#">Politics,</a>
                                                <a href="#">Lifestyle</a>
                                            </div> */}
                                            <ul className="blog_meta list">
                                                <li>
                                                    <a href="#">
                                                        {posts[1].authorId.name}
                                                        <i className="lnr lnr-user"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        {formateDate(
                                                            posts[1].createdAt
                                                        )}
                                                        <i className="lnr lnr-calendar-full"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
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
                                            {/* <ul className="social-links">
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
                                            </ul> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-md-9 blog_details">
                                        <h2>{posts[1].title}</h2>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: posts[1].description,
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <br />
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
                                                        <Link
                                                            to={`/blog/${posts[0]._id}`}
                                                        >
                                                            <span className="lnr text-white lnr-arrow-left"></span>
                                                        </Link>
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
