import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import { useSiteType } from "./context/SiteTypeContext";
import PageIncudes from "./layout/PageIncudes";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import Documents from "./pages/Documents";

// Pages

const Yapim = lazy(() => import("./pages/yapim"));
const Main = lazy(() => import("./pages/Main"));
const VisaHome = lazy(() => import("./pages/VisaHome"));
const EducationHome = lazy(() => import("./pages/EducationHome"));
const VisaForm = lazy(() => import("./pages/VisaForm"));
const SchengenForm = lazy(() => import("./pages/SchengenForm"));
const UsaForm = lazy(() => import("./pages/UsaForm"));
const VisaCalculateForm = lazy(() => import("./pages/VisaCalculateForm"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Service = lazy(() => import("./pages/Service"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

function App() {
  function getCookie(name) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }

    return null;
  }

  const { activeSite } = useSiteType();

  const { setLogin } = useContext(UserContext);

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.common["authorization"] = `${getCookie("token")}`;

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setLogin(true);
    } else {
      setLogin(false);
      delete axios.defaults.headers.common["Authorization"];
    }

    // Axios interceptor for handling 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setLogin(false);
          delete axios.defaults.headers.common["Authorization"];
          return <Navigate to="/" />;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* {activeSite} */}
            {/* {activeSite ? (
              <Route path={"/"} element={<Home />} />
            ) : (
              <Route index element={<Main />} />
            )} */}
            <Route index element={<Main />} />
            <Route
              path={"/visa"}
              element={
                <PageIncudes title={"Vize"}>
                  <VisaHome />
                </PageIncudes>
              }
            />

            <Route
              path={"/education"}
              element={
                <PageIncudes title={"Yurtdışı Eğitim"}>
                  <EducationHome />
                </PageIncudes>
              }
            />

            <Route
              path={"/uk-form"}
              element={
                <PageIncudes title={"İngiltere Vize Formu"}>
                  <VisaForm />
                </PageIncudes>
              }
            />

            <Route
              path={"/schengen-form"}
              element={
                <PageIncudes title={"Schengen Vize Formu"}>
                  <SchengenForm />
                </PageIncudes>
              }
            />

            <Route
              path={"/usa-form"}
              element={
                <PageIncudes title={"USA Vize Formu"}>
                  <UsaForm />
                </PageIncudes>
              }
            />

            <Route
              path={"/visa-calculate"}
              element={
                <PageIncudes title={"Vize Alma İhtimalinizi Öğrenin"}>
                  <VisaCalculateForm />
                </PageIncudes>
              }
            />

            <Route
              path={"/about-us"}
              element={
                <PageIncudes title={"Hakkımızda"}>
                  <AboutUs />
                </PageIncudes>
              }
            />

            <Route
              path={"/service/:link"}
              element={
                <PageIncudes>
                  <Service />
                </PageIncudes>
              }
            />

            <Route
              path={"/contact"}
              element={
                <PageIncudes title={"İletişim"}>
                  <Contact />
                </PageIncudes>
              }
            />

            <Route
              path={"/blog"}
              element={
                <PageIncudes title={"Bloglar"}>
                  <Blog />
                </PageIncudes>
              }
            />

            <Route
              path={"/blog/:link"}
              element={
                <PageIncudes>
                  <BlogDetail />
                </PageIncudes>
              }
            />

            <Route
              path={"/my-documents"}
              element={
                <PageIncudes title={"Belgelerim"}>
                  <Documents />
                </PageIncudes>
              }
            />

            <Route path={"*"} element={<Yapim />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
