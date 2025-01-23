import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

export default function PageIncudes({ title, children }) {
  const location = useLocation();
  const { loader } = useGlobal();
  const { t } = useTranslation(); // i18n hook

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = title + ` | AYA Journey`;
    } else {
      document.title = `${t("siteTitle")} | AYA Journey`;
    }
  }, [location, title, t]);
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
