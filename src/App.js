import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";

// Pages
const Main = lazy(() => import("./pages/Main"));

function App() {
  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Main />} />
            {/* <Route
              path={"/about-us"}
              element={
                <InclusivePage title={"Hakkımızda | Alsaç Araç Kiralama"}>
                  <AboutUs />
                </InclusivePage>
              }
            /> */}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
