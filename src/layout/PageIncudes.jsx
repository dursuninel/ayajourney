import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageIncudes({ title, children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = title + ` | AYA Journey`;
    } else {
      document.title = `Seyahatlerinizi Kolayca Yönetin | AYA Journey`;
    }
  }, [location, title]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
