import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiPost } from "../../services/Api";
import { PostType } from "../../interfaces";
import { formateDate } from "../../helpers/convert";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./styles.css";
export default function Blog() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const posts: PostType[] = await ApiPost.getAllPosts();
                console.log(posts);
                setPosts(posts);
            } catch (error) {
                // console.log(error);
            }
        };

        fetchData();
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <>
            {/* <!--================Blog Categorie Area =================--> */}
            <section className="blog_categorie_area section_gap_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="categories_post">
                                <img
                                    src="/img/blog/cat-post/cat-post-3.jpg"
                                    alt="post"
                                />
                                <div className="categories_details">
                                    <div className="categories_text">
                                        <Link to="detail">
                                            <h5>Social Life</h5>
                                        </Link>
                                        <div className="border_line"></div>
                                        <p>Enjoy your social life together</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="categories_post">
                                <img
                                    src="/img/blog/cat-post/cat-post-2.jpg"
                                    alt="post"
                                />
                                <div className="categories_details">
                                    <div className="categories_text">
                                        <Link to="detail">
                                            <h5>Politics</h5>
                                        </Link>
                                        <div className="border_line"></div>
                                        <p>Be a part of politics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="categories_post">
                                <img
                                    src="/img/blog/cat-post/cat-post-1.jpg"
                                    alt="post"
                                />
                                <div className="categories_details">
                                    <div className="categories_text">
                                        <Link to="detail">
                                            <h5>Food</h5>
                                        </Link>
                                        <div className="border_line"></div>
                                        <p>Let the food be finished</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================Blog Categorie Area =================--> */}

            {/* <!--================Blog Area =================--> */}
            <section className="blog_area blog_area-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog_left_sidebar">
                                {posts?.map((post) => {
                                    return (
                                        <article
                                            className="row blog_item"
                                            key={post._id}
                                        >
                                            {/* infor */}
                                            <div className="col-md-3">
                                                <div className="blog_info text-right">
                                                    <div className="post_tag">
                                                        <a
                                                            className="active"
                                                            href="#"
                                                        >
                                                            Technology,
                                                        </a>
                                                    </div>
                                                    <ul className="blog_meta list">
                                                        <li>
                                                            <a href="#">
                                                                {formateDate(
                                                                    post.createdAt
                                                                )}
                                                                <i className="lnr lnr-calendar-full"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                {post.views}{" "}
                                                                Views
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
                                                </div>
                                            </div>
                                            {/* post */}
                                            <div className="col-md-9">
                                                <div className="blog_post">
                                                    {post.featureImageUrl && (
                                                        <img
                                                            src={
                                                                post.featureImageUrl
                                                            }
                                                            alt=""
                                                            className="blog_post_image"
                                                            style={{
                                                                
                                                            }}
                                                        />
                                                    )}
                                                    <div className="blog_details">
                                                        <Link to={post._id}>
                                                            <h2>
                                                                {post.title}
                                                            </h2>
                                                        </Link>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: post.description,
                                                            }}
                                                        />
                                                        <Link
                                                            to={post._id}
                                                            className="primary_btn"
                                                        >
                                                            <span>
                                                                View More
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}

                                {/* pagetitation */}
                                <article>
                                    <nav className="blog-pagination justify-content-center d-flex">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                    aria-label="Previous"
                                                >
                                                    <span aria-hidden="true">
                                                        <span className="lnr lnr-chevron-left"></span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    01
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    02
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    03
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    04
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                >
                                                    09
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                    aria-label="Next"
                                                >
                                                    <span aria-hidden="true">
                                                        <span className="lnr lnr-chevron-right"></span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </article>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
