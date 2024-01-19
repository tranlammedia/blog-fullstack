import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SampleLayout from "./layout/SampleLayout";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import PortfolioDetail from "./pages/PortfolioDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SampleLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
			<Route path="/post" element={<PortfolioDetail />} />

            <Route path="/portfolio" >
              <Route index element={<PortfolioDetail />} />
              <Route path="/portfolio/:post" element={<Portfolio />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Blog>
          <Sidebar />
        </Blog> */}
      {/* <BlogDetail>
          <Sidebar />
        </BlogDetail> */}
      {/* <Contact /> */}
    </>
  );
}

export default App;
