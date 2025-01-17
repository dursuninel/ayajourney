import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loader from "../components/Loader";

export default function PageIncudes({ title, children }) {
  const location = useLocation();
  const { loader } = useGlobal();

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
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
