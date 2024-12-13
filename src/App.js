import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import { useSiteType } from "./context/SiteTypeContext";
import PageIncudes from "./layout/PageIncudes";
import { UserContext } from "./context/UserContext";
import axios from "axios";

// Pages
const Main = lazy(() => import("./pages/Main"));
const Home = lazy(() => import("./pages/Home"));
const EducationHome = lazy(() => import("./pages/EducationHome"));
const VisaForm = lazy(() => import("./pages/VisaForm"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

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
  axios.defaults.baseURL = "http://localhost:5001";
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
                <PageIncudes>
                  <Home />
                </PageIncudes>
              }
            />

            <Route path={"/education"} element={<EducationHome />} />
            <Route
              path={"/form"}
              element={
                <PageIncudes>
                  <VisaForm />
                </PageIncudes>
              }
            />

            <Route
              path={"/hakkimizda"}
              element={
                <PageIncudes>
                  <AboutUs />
                </PageIncudes>
              }
            />

            <Route path={"*"} element={<EducationHome />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
