import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageIncudes({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
