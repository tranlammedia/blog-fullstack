import { useEffect, useState } from "react";
import NavLeft from "../../../components/DashboardNav/NavLeft";
import { useShowNavLeft } from "../../../providers/useShowNavLeft";
import { ApiCategory, ApiPost, ApiTag } from "../../../services/Api";
import "./styles.css";
import { useEditor } from "../../../providers/useEditor";
import { useLocation } from "react-router-dom";

export default function ManagerCategory() {
    const { showNavLeft, setShowNavLeft }: any = useShowNavLeft();
    const { categories, setCategories, tags, setTags }: any = useEditor();
    const [callApi, setCallApi] = useState(false);
    const [selectItem, setSelectItem] = useState<any>(undefined);
    const [updateItem, setUpdateItem] = useState<any>(undefined);
    const [showModal, setShowModal] = useState<"category" | "tag">("category");

    useEffect(() => {
        const fectch = async () => {
            try {
                const categories = await ApiCategory.getAll();
                const tags = await ApiTag.getAll();

                setCategories(categories);
                setTags(tags);
            } catch (error) {}
        };

        fectch();
    }, []);


    useEffect(() => {
        setUpdateItem(selectItem);
    }, [showModal, selectItem]);

    const hanldeShowModal = (type, item = undefined) => {
        setShowModal(type);
        setSelectItem(item);
    };

    const handleButtonCreate = async () => {
        if (showModal === "category") {
            const updatedItem = await ApiCategory.createCategory(updateItem);
            setCategories([...categories, updatedItem]);
        } else {
            const updatedItem = await ApiTag.createTag(updateItem);
            setTags([...tags, updatedItem]);
        }
    };

    const handleButtonUpdate = () => {
        if (showModal === "category") {
            const updatedCategories = categories.map((item) => {
                if (item._id === updateItem._id) {
                    return updateItem;
                }
                return item;
            });
            setCategories(updatedCategories);
            ApiCategory.updateCategory(updateItem);
        } else {
            const updatedTags = tags.map((item) => {
                if (item._id === updateItem._id) {
                    return updateItem;
                }
                return item;
            });
            setTags(updatedTags);
            ApiTag.updateTag(updateItem);
        }
    };

    const handleButtonDelete = () => {
        if (showModal === "category") {
            const updatedCategories = categories.filter(item => item._id !== selectItem._id);
            setCategories(updatedCategories);
            ApiCategory.deleteCategory(selectItem);
        } else {
            const updatedTags = tags.filter(item => item._id !== selectItem._id);
            setTags(updatedTags);
            ApiTag.deleteTag(selectItem);
        }
    };

    return (
        <section className="container-dashboard">
            <NavLeft />
            <div className={`main-content ${showNavLeft ? "open-left" : ""} `}>
                <div className="row">
                    <div className="col-md-7">
                        <div className=" d-flex justify-content-between">
                            <h2>Categories</h2>
                            <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#formEditModal"
                                onClick={() => hanldeShowModal("category")}
                            >
                                New Category{" "}
                                <span className="badge badge-primary"></span>
                            </button>
                        </div>
                        <table className="table table-striped table-width-manager-category">
                            {/* <!-- Phần header của bảng --> */}
                            <thead>
                                <tr>
                                    <th>Tên Danh mục</th>
                                    <th>Mô tả</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            {/* <!-- Phần body của bảng --> */}
                            <tbody>
                                {categories?.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>
                                            <a
                                                // href={"/blog/" + post._id}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {category.name.slice(0, 60)}
                                                {category.name?.length > 60 &&
                                                    "..."}
                                            </a>
                                        </td>
                                        <td>
                                            {category.description?.slice(
                                                0,
                                                100
                                            )}
                                            {category.description?.length >
                                                100 && "..."}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm mr-2"
                                                data-toggle="modal"
                                                data-target={`#formEditModal`}
                                                onClick={() =>
                                                    hanldeShowModal(
                                                        "category",
                                                        category
                                                    )
                                                }
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                data-toggle="modal"
                                                data-target={`#formDeleteModal`}
                                                onClick={() =>
                                                    hanldeShowModal(
                                                        "category",
                                                        category
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* <!-- Thêm các dòng dữ liệu khác vào đây --> */}
                            </tbody>
                        </table>
                        {categories && "Chưa có danh mục nào"}
                    </div>
                    <div className="col-md-5">
                        <div className=" d-flex justify-content-between">
                            <h2>Tags</h2>
                            <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#formEditModal"
                                onClick={() => hanldeShowModal("tag")}
                            >
                                New Tag{" "}
                                <span className="badge badge-primary"></span>
                            </button>
                        </div>
                        <table className="table table-striped table-width-manager-tags">
                            {/* <!-- Phần header của bảng --> */}
                            <thead>
                                <tr>
                                    <th>Tên Nhãn</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            {/* <!-- Phần body của bảng --> */}
                            <tbody>
                                {tags?.map((tag, index) => (
                                    <tr key={tag._id}>
                                        <td>
                                            <a
                                                href={"/blog/" + tag._id}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {tag.name.slice(0, 60)}
                                                {tag.name?.length > 60 && "..."}
                                            </a>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm mr-2"
                                                data-toggle="modal"
                                                data-target="#formEditModal"
                                                onClick={() =>
                                                    hanldeShowModal("tag", tag)
                                                }
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                data-toggle="modal"
                                                data-target={`#formDeleteModal`}
                                                onClick={() =>
                                                    hanldeShowModal("tag", tag)
                                                }
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* <!-- Thêm các dòng dữ liệu khác vào đây --> */}
                            </tbody>
                        </table>
                        {tags && "Chưa có nhãn nào" }
                    </div>
                    {/* Form edit item */}

                    <div
                        className="modal fade"
                        id="formEditModal"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="formEditModalLabel"
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
                                        id="formEditModalLabel"
                                    >
                                        {selectItem ? "Cập nhật" : "Tạo"}{" "}
                                        {showModal === "category"
                                            ? "Danh mục"
                                            : "Nhãn"}{" "}
                                        {selectItem ? "" : "mới"}
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
                                    <div className="form-group">
                                        <label htmlFor="">
                                            Tên{" "}
                                            {showModal === "category"
                                                ? "Danh mục"
                                                : "Nhãn"}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={
                                                updateItem
                                                    ? updateItem.name
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setUpdateItem({
                                                    ...updateItem,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            aria-describedby="helpId"
                                            placeholder=""
                                        />
                                        {showModal === "category" && (
                                            <>
                                                <label htmlFor="">Mô tả</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={2}
                                                    name="description"
                                                    value={
                                                        updateItem
                                                            ? updateItem.description
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setUpdateItem({
                                                            ...updateItem,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    aria-describedby="helpId"
                                                    placeholder=""
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Cancle
                                    </button>

                                    {selectItem ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-dismiss="modal"
                                            onClick={handleButtonUpdate}
                                        >
                                            Update
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-dismiss="modal"
                                            onClick={handleButtonCreate}
                                        >
                                            Create
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Form delete item */}
                    {
                        <div
                        className="modal fade"
                        id={`formDeleteModal`}
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="formDeleteModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="formDeleteModalLabel">
                                        Xác nhận xóa {showModal === 'category' ? 'Danh mục' : 'Nhãn'}
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
                                    {showModal === 'category' ? 'Danh mục' : 'Nhãn'}:
                                    <span className="font-weight-bold">
                                        {" "}
                                        {selectItem?.name}
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
                                        onClick={() => handleButtonDelete()}
                                        data-dismiss="modal"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>
    );
}
