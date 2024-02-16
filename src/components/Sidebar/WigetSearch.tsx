export default function WigetSearch() {
    return (
        <aside className="single_sidebar_widget search_widget">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Posts"
                />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                        <i className="lnr lnr-magnifier"></i>
                    </button>
                </span>
            </div>
            {/* <!-- /input-group --> */}
            <div className="br"></div>
        </aside>
    );
}
