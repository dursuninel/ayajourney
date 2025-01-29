import React from "react";
import ReactDOM from "react-dom/client";
import { addLocale } from "primereact/api";

import "./assets/css/App.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { SiteTypeProvider } from "./context/SiteTypeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { UserProvider } from "./context/UserContext";
import { GlobalProvider } from "./context/GlobalContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


addLocale("tr", {
  firstDayOfWeek: 1,
  dayNames: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  dayNamesMin: ["P", "Pz", "S", "Ç", "P", "C", "Ct"],
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  today: "Bugün",
  clear: "Temizle",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <GlobalProvider>
      <UserProvider>
        <BrowserRouter>
          <SiteTypeProvider>
            <App />
          </SiteTypeProvider>
        </BrowserRouter>
      </UserProvider>
    </GlobalProvider>
  </LanguageProvider>
);
