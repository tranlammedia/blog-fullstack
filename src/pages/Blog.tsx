import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiPost } from "../services/Api";
import { PostType } from "../interfaces";
import { formateDate } from "../helpers/convert";

export default function Blog() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const posts: PostType[] = await ApiPost.getAllPosts();
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
            <section className="blog_area">
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
                                                        <a href="#">Food,</a>
                                                        <a
                                                            className="active"
                                                            href="#"
                                                        >
                                                            Technology,
                                                        </a>
                                                        <a href="#">
                                                            Politics,
                                                        </a>
                                                        <a href="#">
                                                            Lifestyle
                                                        </a>
                                                    </div>
                                                    <ul className="blog_meta list">
                                                        <li>
                                                            <a href="#">
                                                                {
                                                                    post
                                                                        .authorId
                                                                        .name
                                                                }
                                                                <i className="lnr lnr-user"></i>
                                                            </a>
                                                        </li>
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
                                                    <img
                                                        src="/img/blog/main-blog/m-blog-1.jpg"
                                                        alt=""
                                                    />
                                                    <div className="blog_details">
                                                        <Link to={post._id}>
                                                            <h2>
                                                                {post.title}
                                                            </h2>
                                                        </Link>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: post.content,
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
                                            <a href="#" className="page-link">
                                                01
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a href="#" className="page-link">
                                                02
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">
                                                03
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">
                                                04
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">
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
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget search_widget">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Posts"
                                        />
                                        <span className="input-group-btn">
                                            <button
                                                className="btn btn-default"
                                                type="button"
                                            >
                                                <i className="lnr lnr-magnifier"></i>
                                            </button>
                                        </span>
                                    </div>
                                    {/* <!-- /input-group --> */}
                                    <div className="br"></div>
                                </aside>
                                <aside className="single_sidebar_widget author_widget">
                                    <img
                                        className="author_img rounded-circle"
                                        src="/img/blog/author.png"
                                        alt=""
                                    />
                                    <h4>Charlie Barber</h4>
                                    <p>Senior blog writer</p>
                                    <div className="social_icon">
                                        <a href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-github"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-behance"></i>
                                        </a>
                                    </div>
                                    <p>
                                        Boot camps have its supporters andit
                                        sdetractors. Some people do not
                                        understand why you should have to spend
                                        money on boot camp when you can get.
                                        Boot camps have itssuppor ters andits
                                        detractors.
                                    </p>
                                    <div className="br"></div>
                                </aside>
                                <aside className="single_sidebar_widget popular_post_widget">
                                    <h3 className="widget_title">
                                        Popular Posts
                                    </h3>
                                    <div className="media post_item">
                                        <img
                                            src="/img/blog/popular-post/post1.jpg"
                                            alt="post"
                                        />
                                        <div className="media-body">
                                            <Link to="detail">
                                                <h3>
                                                    Space The Final Frontier
                                                </h3>
                                            </Link>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="media post_item">
                                        <img
                                            src="/img/blog/popular-post/post2.jpg"
                                            alt="post"
                                        />
                                        <div className="media-body">
                                            <Link to="detail">
                                                <h3>The Amazing Hubble</h3>
                                            </Link>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="media post_item">
                                        <img
                                            src="/img/blog/popular-post/post3.jpg"
                                            alt="post"
                                        />
                                        <div className="media-body">
                                            <Link to="detail">
                                                <h3>Astronomy Or Astrology</h3>
                                            </Link>
                                            <p>03 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="media post_item">
                                        <img
                                            src="/img/blog/popular-post/post4.jpg"
                                            alt="post"
                                        />
                                        <div className="media-body">
                                            <Link to="detail">
                                                <h3>Asteroids telescope</h3>
                                            </Link>
                                            <p>01 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="br"></div>
                                </aside>
                                <aside className="single_sidebar_widget ads_widget">
                                    <a href="#">
                                        <img
                                            className="img-fluid"
                                            src="/img/blog/add.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <div className="br"></div>
                                </aside>
                                <aside className="single_sidebar_widget post_category_widget">
                                    <h4 className="widget_title">
                                        Post Catgories
                                    </h4>
                                    <ul className="list cat-list">
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Technology</p>
                                                <p>37</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Lifestyle</p>
                                                <p>24</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Fashion</p>
                                                <p>59</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Art</p>
                                                <p>29</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Food</p>
                                                <p>15</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Architecture</p>
                                                <p>09</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="d-flex justify-content-between"
                                            >
                                                <p>Adventure</p>
                                                <p>44</p>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="br"></div>
                                </aside>
                                <aside className="single-sidebar-widget newsletter_widget">
                                    <h4 className="widget_title">Newsletter</h4>
                                    <p>
                                        Here, I focus on a range of items and
                                        features that we use in life without
                                        giving them a second thought.
                                    </p>
                                    <div className="form-group d-flex flex-row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i
                                                        className="fa fa-envelope"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inlineFormInputGroup"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <a href="#" className="bbtns">
                                            Subcribe
                                        </a>
                                    </div>
                                    <p className="text-bottom">
                                        You can unsubscribe at any time
                                    </p>
                                    <div className="br"></div>
                                </aside>
                                <aside className="single-sidebar-widget tag_cloud_widget">
                                    <h4 className="widget_title">Tag Clouds</h4>
                                    <ul className="list">
                                        <li>
                                            <a href="#">Technology</a>
                                        </li>
                                        <li>
                                            <a href="#">Fashion</a>
                                        </li>
                                        <li>
                                            <a href="#">Architecture</a>
                                        </li>
                                        <li>
                                            <a href="#">Fashion</a>
                                        </li>
                                        <li>
                                            <a href="#">Food</a>
                                        </li>
                                        <li>
                                            <a href="#">Technology</a>
                                        </li>
                                        <li>
                                            <a href="#">Lifestyle</a>
                                        </li>
                                        <li>
                                            <a href="#">Art</a>
                                        </li>
                                        <li>
                                            <a href="#">Adventure</a>
                                        </li>
                                        <li>
                                            <a href="#">Food</a>
                                        </li>
                                        <li>
                                            <a href="#">Lifestyle</a>
                                        </li>
                                        <li>
                                            <a href="#">Adventure</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
