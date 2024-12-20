import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageIncudes({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
