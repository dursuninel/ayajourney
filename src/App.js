import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import { useSiteType } from "./context/SiteTypeContext";
import Header from "./layout/Header";

// Pages
const Main = lazy(() => import("./pages/Main"));
const Home = lazy(() => import("./pages/Home"));
const VisaForm = lazy(() => import("./pages/VisaForm"));

function App() {
  const { activeSite } = useSiteType();

  return (
    <>
      <main>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* {activeSite ? (
              <Route path={"/"} element={<Home />} />
            ) : (
              <Route index element={<Main />} />
            )} */}
            <Route path={"/"} element={<Home />} />
            <Route path={"/form"} element={<VisaForm />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
