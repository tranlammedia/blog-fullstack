import { Route, Routes } from "react-router-dom";

import SampleLayout from "./layout/SampleLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import DashboardLayout from "./layout/DashboardLayout";
import Editor from "./pages/Dashboard/Editor/Editor";
import ManagerPosts from "./pages/Dashboard/ManagerPosts/ManagerPosts";
import ManagerUsers from "./pages/Dashboard/ManagerUsers/ManagerUsers";
import { useAuth } from "./providers/useAuth";
import AuthToken from "./pages/AuthToken";

function App() {
    const { userLogin }: any = useAuth();
    return (
        <Routes>
            <Route path="/auth" element={<AuthToken />} />
            <Route path="/" element={<SampleLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/post" element={<PortfolioDetail />} />
                <Route path="/portfolio">
                    <Route index element={<Portfolio />} />
                    <Route path=":project" element={<PortfolioDetail />} />
                </Route>
                <Route path="/blog">
                    <Route index element={<Blog />} />
                    <Route path=":blogid" element={<BlogDetail />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
            </Route>
            {userLogin && (
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<ManagerPosts />} />
                    <Route path="new" element={<Editor />} />
                    <Route path="users" element={<ManagerUsers />} />
                </Route>
            )}
            <Route path="*" element={<AuthToken />} />
        </Routes>
    );
}

export default App;
