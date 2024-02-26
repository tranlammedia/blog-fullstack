import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiPost } from "../../services/Api";
import { CategoryType, PostType } from "../../interfaces";
import { formateDate } from "../../helpers/convert";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./styles.css";

interface fetchPost {
    totalPages: number;
    page: number;
    data: PostType[];
}

export default function Blog() {
    const location = useLocation();
    const [dataPost, setDataPost] = useState<fetchPost | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get('category')?.split('-')[1];
        const tagId = queryParams.get('tag')?.split('-')[1];
        const search = queryParams.get('search');
    
        const queryObj = {
            ...(categoryId? {categoryId: categoryId} : {}),
            ...(tagId? {tagId: tagId} : {}),
            ...(search? {search: search} : {}),
        }
        
        const fetchData = async () => {
            try {
                const posts = await ApiPost.getPostsForReader(queryObj);

                setDataPost(posts);
            } catch (error) {
                // console.log(error);
            }
        };

        fetchData();
        return () => {
            window.scrollTo(0, 0);
        };
      }, [location]);
      
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const posts = await ApiPost.getPostsForReader();

                setDataPost(posts);
            } catch (error) {
                // console.log(error);
            }
        };

        fetchData();
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    const handleMoveToPage = (page: number) => {
        const fetchData = async () => {
            try {
                const posts = await ApiPost.getPostsForReader({page:page});

                setDataPost(posts);
            } catch (error) {
                // console.log(error);
            }
        };
        if (dataPost?.page !== page) {
            fetchData();
        }
    };

    const elpagetitation = (dataPost) => {
        if (!dataPost) return null;
        const elpages: JSX.Element[] = [];
        const currentpage = dataPost.page;
        const totalPages = dataPost.totalPages;

        const start = currentpage - 2 < 1 ? 1 : currentpage - 2;
        const end = currentpage + 2 > totalPages ? totalPages : currentpage + 2;
        const prev = currentpage - 1 < 1 ? 1 : currentpage - 1;
        const next =
            currentpage + 1 > totalPages ? totalPages : currentpage + 1;

        elpages.push(
            <li
                key={"prev"}
                className={`page-item ${currentpage == 1 ? "disabled" : ""}`}
            >
                <a
                    className="page-link"
                    href="#"
                    tabIndex={-1}
                    onClick={() => handleMoveToPage(prev)}
                >
                    <span className="lnr lnr-chevron-left"></span>
                </a>
            </li>
        );
        if (start > 1)
            elpages.push(
                <li key={"start"} className="page-item">
                    ...
                </li>
            );
        for (let page = start; page <= end; page++) {
            elpages.push(
                <li
                    className={`page-item ${
                        page === currentpage ? "active" : ""
                    }`}
                    key={page}
                    onClick={() => handleMoveToPage(page)}
                >
                    <a href="#" className="page-link">
                        {page}
                    </a>
                </li>
            );
        }
        if (end < totalPages)
            elpages.push(
                <li key={"right"} className="page-item">
                    ...
                </li>
            );
        elpages.push(
            <li
                key={"next"}
                className={`page-item ${
                    currentpage == totalPages ? "disabled" : ""
                }`}
            >
                <a
                    className="page-link"
                    href="#"
                    onClick={() => handleMoveToPage(next)}
                >
                    <span className="lnr lnr-chevron-right"></span>
                </a>
            </li>
        );
        return elpages;
    };
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
                                {dataPost?.data.map((post) => {
                                    return (
                                        <article
                                            className="row blog_item"
                                            key={post._id}
                                        >
                                            {/* infor */}
                                            <div className="col-md-3">
                                                <div className="blog_info text-right">
                                                    {post?.categoryIds[0] && (
                                                        <div className="post_tag">
                                                            <Link
                                                            to={`/blog?category=${(post?.categoryIds[0] as CategoryType)?.name}-${(post?.categoryIds[0] as CategoryType)?._id}`}
                                                                className="active"
                                                            >
                                                                {
                                                                    (
                                                                        post
                                                                            .categoryIds[0] as CategoryType
                                                                    )?.name
                                                                }
                                                            </Link>
                                                        </div>
                                                    )}
                                                    <ul className="blog_meta list">
                                                        <li>
                                                            <a >
                                                                {formateDate(
                                                                    post.createdAt
                                                                )}
                                                                <i className="lnr lnr-calendar-full"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <Link to={post._id}>
                                                                {post.views}{" "}
                                                                Views
                                                                <i className="lnr lnr-eye"></i>
                                                            </Link>
                                                        </li>
                                                        {/* <li>
                                                            <a href="#">
                                                                06 Comments
                                                                <i className="lnr lnr-bubble"></i>
                                                            </a>
                                                        </li> */}
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
                                                            style={{}}
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
                                            {(dataPost && dataPost.data.length >0)
                                                ? elpagetitation(dataPost)
                                                : "Không có bài viết nào được tìm thấy"}
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
