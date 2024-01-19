import React, { ReactNode, ReactElement } from "react";
import { TITLES } from "../config/title";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";

interface SampleLayoutProps {
  children: ReactNode;
}
const componentNotShow : string[]= ["Home", "BlogDetail"]

export default function SampleLayout({ children }: SampleLayoutProps) {
  let childComponentName: string = "";
  if (React.isValidElement(children)) {
    const childElement = children as ReactElement;
    const childComponentType = childElement.type;

    if (typeof childComponentType === "function") {
      childComponentName =
        (childComponentType as React.FunctionComponent).displayName ||
        childComponentType.name;
    }
  }

  return (
    <>
      <Header />
      {!componentNotShow.includes(childComponentName) && (
        <Banner title={TITLES[childComponentName]} />
      )}
      {children}
      <Newsletter />
      <Footer />
    </>
  );
}
