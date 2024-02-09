import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/Header/HeaderDashboard";
import { ShowNavLeftProvider } from "../providers/useShowNavLeft";

export default function DashboardLayout() {
    return (
        <ShowNavLeftProvider>
            <HeaderDashboard />
            <Outlet />
            {/* <Footer /> */}
        </ShowNavLeftProvider>
    );
}
