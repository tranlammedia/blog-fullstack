import NavLeft from "../../../components/DashboardNav/NavLeft";
import { useShowNavLeft } from "../../../providers/useShowNavLeft";

export default function ManagerPosts() {
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();

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
                <table className="table table-striped">
                    {/* <!-- Phần header của bảng --> */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Chủ đề</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    {/* <!-- Phần body của bảng --> */}
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Chủ đề 1</td>
                            <td>Nội dung của chủ đề 1</td>
                            <td>Crypto</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#bottonDeleteModal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chủ đề 1</td>
                            <td>Nội dung của chủ đề 1</td>
                            <td>Crypto</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#bottonDeleteModal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chủ đề 1</td>
                            <td>Nội dung của chủ đề 1</td>
                            <td>Crypto</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#bottonDeleteModal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chủ đề 1</td>
                            <td>Nội dung của chủ đề 1</td>
                            <td>Crypto</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#bottonDeleteModal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Chủ đề 1</td>
                            <td>Nội dung của chủ đề 1</td>
                            <td>Crypto</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mr-2"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#bottonDeleteModal"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        {/* <!-- Thêm các dòng dữ liệu khác vào đây --> */}
                    </tbody>
                </table>

                {/* <!-- Phân trang --> */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                            <a
                                className="page-link"
                                href="#"
                                tabIndex={-1}
                                aria-disabled="true"
                            >
                                Trước
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Tiếp theo
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* <!-- Modal conform delete--> */}
            <div
                className="modal fade"
                id="bottonDeleteModal"
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
                            Bạn có chắc chắn muốn xóa bài viết này không?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Hủy
                            </button>
                            <button type="button" className="btn btn-danger">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
