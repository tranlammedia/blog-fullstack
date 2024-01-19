import React, { ReactNode, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { TITLES } from "../config/title";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";

interface SampleLayoutProps {
  children: ReactNode;
}
const componentNotShow : string[]= ["Home", "BlogDetail"]

export default function SampleLayout() {

  return (
    <>
      <Header />
      
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
}
