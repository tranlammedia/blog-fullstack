import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";

import Newsletter from "../components/Newsletter";
import FormSignin from "../components/FormSignin/FormSignin";

export default function SampleLayout() {

  return (
    <>
      <Header />
      <FormSignin></FormSignin>
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
}
