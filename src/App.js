import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import { useSiteType } from "./context/SiteTypeContext";
import PageIncudes from "./layout/PageIncudes";
// Pages
const Main = lazy(() => import("./pages/Main"));
const Home = lazy(() => import("./pages/Home"));
const VisaForm = lazy(() => import("./pages/VisaForm"));

function App() {
  const { activeSite } = useSiteType();

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
            <Route
              path={"/form"}
              element={
                <PageIncudes>
                  <VisaForm />
                </PageIncudes>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
