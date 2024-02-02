
import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/Header/HeaderDashboard";
import { createContext, useContext, useState } from "react";

const ShowNavLeftContext = createContext({});

export default function DashboardLayout() {
  const [showNavLeft, setShowNavLeft] = useState({});

  return (
    <ShowNavLeftContext.Provider value={{ showNavLeft, setShowNavLeft }}>
      <HeaderDashboard />
      <Outlet />
      {/* <Footer /> */}
    </ShowNavLeftContext.Provider>
  );
}

export const useShowNavLeft = () => {
  const context = useContext(ShowNavLeftContext);
  if (!context) {
    throw new Error('useShowNavLeft must be used within a ShowNavLeftProvider');
  }
  return context;
};