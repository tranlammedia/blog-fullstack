
import { Outlet, useNavigate } from "react-router-dom";
import HeaderDashboard from "../components/Header/HeaderDashboard";


export default function DashboardLayout() {


  return (
    <>

      <HeaderDashboard />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
