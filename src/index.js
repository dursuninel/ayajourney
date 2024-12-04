import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/App.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { SiteTypeProvider } from "./context/SiteTypeContext";
import { LanguageProvider } from "./context/LanguageContext";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <SiteTypeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteTypeProvider>
  </LanguageProvider>
);
