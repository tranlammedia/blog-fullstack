import { useEffect, useState } from "react";
import NavLeft from "../../../components/DashboardNav/NavLeft";
import { useShowNavLeft } from "../../../providers/useShowNavLeft";
import { ApiPost } from "../../../services/Api";
import { PostType } from "../../../interfaces";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { formateDate } from "../../../helpers/convert";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCategoriesFetch } from "../../../redux/modules/categorySlice";
import { getTagsFetch } from "../../../redux/modules/tagSlice";
import { clearPostState, postSelect } from "../../../redux/modules/postSlice";

interface fetchPost {
    totalPages: number;
    page: number;
    data: PostType[];
}

export default function ManagerPosts() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const [dataPost, setDataPost] = useState<fetchPost | null>(null);
    const [callApi, setCallApi] = useState(false);
    const [postDelete, setPostDelete] = useState<PostType | null>(null);
    
    const post = useAppSelector(postSelect)

    useEffect(() => {
        dispatch(getCategoriesFetch())
        dispatch(getTagsFetch())
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const posts = await ApiPost.getPostsForAdmin();
            setDataPost(posts);
        };
        fetch();
        
    }, [callApi]);
    
    const handleOpenDeleteModal = async (postDelete) => {
        setPostDelete(postDelete);
    };
    const handleDeletePost = async (postId: string) => {
        await ApiPost.deletePost(postId);
        setCallApi(!callApi);
    };

    const handleMoveToPage = (page: number) => {
        const fetchData = async () => {
            try {
                const posts = await ApiPost.getPostsForAdmin(page);

                setDataPost(posts);
            } catch (error) {
                // console.log(error);
            }
        };
        if (dataPost?.page !== page) {
            fetchData();
        }
    };

    const handleButtonEditPost = () => {
        dispatch(clearPostState())
    }

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
                    tabIndex={-1}
                    onClick={() => handleMoveToPage(prev)}
                >
                    Trước
                </a>
            </li>
        );

        if (start > 1)
            elpages.push(
                <li key={"letf"} className="page-item">
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
                    <a className="page-link">{page}</a>
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
                <a className="page-link" onClick={() => handleMoveToPage(next)}>
                    Tiếp theo
                </a>
            </li>
        );
        return elpages;
    };

    return (
        <section className="container-dashboard">
            <NavLeft />
            <div className={`main-content ${showNavLeft ? "open-left" : ""} `}>
                {/* <!-- Form để lọc và tìm kiếm --> */}
                <form className="mb-4">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="dateFilter">Ngày đăng:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateFilter"
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="categoryFilter">Category:</label>
                            <select
                                className="form-control"
                                id="categoryFilter"
                            >
                                <option value="">Tất cả</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                {/* <!-- Thêm các option khác tương ứng với các category --> */}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="searchInput">Tìm kiếm:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="searchInput"
                                placeholder="Nhập từ khóa..."
                            />
                        </div>
                        <div className="form-group col-md-3 align-self-end">
                            <button type="submit" className="btn btn-primary">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
                <b>Danh sách bài viết</b>

                {/* <!-- Bảng danh sách bài viết --> */}
                <table className="table table-striped table-width-manager-posts">
                    {/* <!-- Phần header của bảng --> */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Chủ đề</th>
                            <th>Ngày update</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    {/* <!-- Phần body của bảng --> */}
                    {
                        <tbody>
                            {dataPost?.data.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a
                                            href={"/blog/" + post._id}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {post.title.slice(0, 60)}
                                            {post.title?.length > 60 && "..."}
                                        </a>
                                    </td>
                                    <td>
                                        {post.description?.slice(0, 100)}
                                        {post.description?.length > 100 &&
                                            "..."}
                                    </td>
                                    <td>
                                        {post.categoryIds?.map(
                                            (category, index) => (
                                                <a key={index} href="#">
                                                    |{category.name}|{" "}
                                                </a>
                                            )
                                        )}
                                    </td>
                                    <td>{formateDate(post.updateAt)}</td>
                                    <td>
                                        <span
                                            className={` badge badge-${
                                                post.status === "publish"
                                                    ? "success"
                                                    : "secondary"
                                            } badge-custom`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            type="button"
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={handleButtonEditPost}
                                            to={"edit/" + post._id}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            data-toggle="modal"
                                            data-target={`#bottonDeleteModal`}
                                            onClick={() =>
                                                handleOpenDeleteModal(post)
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* <!-- Thêm các dòng dữ liệu khác vào đây --> */}
                        </tbody>
                    }
                </table>
                {(dataPost?.data && dataPost?.data?.length > 0)? (
                    <>
                        Chưa có bài viết nào
                        {/* <!-- Phân trang --> */}
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                { elpagetitation(dataPost)}
                            </ul>
                        </nav>
                    </>
                ) : (
                    ""
                )}
            </div>
            {/* <!-- Modal conform delete--> */}
            {postDelete && (
                <div
                    className="modal fade"
                    id={`bottonDeleteModal`}
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="bottonDeleteModalLabel"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="bottonDeleteModalLabel"
                                >
                                    Xác nhận xóa bài viết
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Bạn có chắc chắn muốn xóa không?
                                <br />
                                Bài viết:
                                <span className="font-weight-bold">
                                    {" "}
                                    {postDelete.title}
                                </span>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDeletePost(postDelete._id)
                                    }
                                    data-dismiss="modal"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
