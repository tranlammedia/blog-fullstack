import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/Header/HeaderDashboard";
import { ShowNavLeftProvider } from "../providers/useShowNavLeft";
import { EditorProvider } from "../providers/useEditor";

export default function DashboardLayout() {
    return (
        <EditorProvider>
        <ShowNavLeftProvider>
            <HeaderDashboard />
            <Outlet />
            {/* <Footer /> */}
        </ShowNavLeftProvider>
        </EditorProvider>
            
    );
}
