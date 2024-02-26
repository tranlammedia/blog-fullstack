import { Route, Routes } from "react-router-dom";

import SampleLayout from "./layout/SampleLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import DashboardLayout from "./layout/DashboardLayout";
import Editor from "./pages/Dashboard/Editor/Editor";
import ManagerPosts from "./pages/Dashboard/ManagerPosts/ManagerPosts";
import ManagerCategory from "./pages/Dashboard/ManagerCategory/ManagerCategory";
import { useAuth } from "./providers/useAuth";
import AuthToken from "./pages/AuthToken";
import Redirect from "./pages/Redirect";

function App() {
    const { userLogin }: any = useAuth();
    return (
        <Routes>
            <Route path="/auth" element={<AuthToken />} />
            <Route path="/redirect/:path" element={<Redirect />} />
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
            {(userLogin && userLogin.role !== 'reader' ) && (
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<ManagerPosts />} />
                    <Route path="new" element={<Editor />} />
                    <Route path="edit/:blogid" element={<Editor />} />
                    <Route path="category" element={<ManagerCategory />} />
                </Route>
            )}
            <Route path="*" element={<AuthToken />} />
        </Routes>
    );
}

export default App;
