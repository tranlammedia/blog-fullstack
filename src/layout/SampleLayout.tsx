import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Newsletter from "../components/Newsletter";
import FormSigninProvider from "../components/FormSignin";

export default function SampleLayout() {
    return (
        <>
            <Header />
            <FormSigninProvider />
            <Outlet />
            <Footer />
        </>
    );
}
