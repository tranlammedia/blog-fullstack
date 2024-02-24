
import "@fortawesome/fontawesome-free/css/all.min.css";

import EditQuill from "../../../components/EditQuill/EditQuill";
import NavRight from "../../../components/DashboardNav/NavRight";
import NavLeft from "../../../components/DashboardNav/NavLeft";
import "./Editor.css"; // Import file CSS tự tạo
import { EditorProvider, useEditor } from "../../../providers/useEditor";

const Editor = () => {

    return (
        
            <section className="container-dashboard">
                <NavLeft />
                <EditQuill
                />
                <NavRight

                ></NavRight>
            </section>
        
    );
};

export default Editor;
