import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/App.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { SiteTypeProvider } from "./context/SiteTypeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SiteTypeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SiteTypeProvider>
);
