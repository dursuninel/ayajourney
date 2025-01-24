import React, { useEffect, useState } from "react";
import { useSiteType } from "../context/SiteTypeContext";
import ParticlesComponent from "../components/ParticlesComponent";
import logo from "../assets/images/aya_journey_logo.svg";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { mainLoadTime, siteType, changeSiteType, resetSiteType } =
    useSiteType();
  const { t } = useTranslation();

  const [hideChoiceMain, setHideChoiceMain] = useState(false); // .choice-main görünürlük kontrolü

  useEffect(() => {
    document.title = `Hedefini Seç | AYA Journey`;
    resetSiteType();
  }, []);

  const handleSiteTypeChange = (id) => {
    changeSiteType(id); // Site tipini değiştir
    setTimeout(() => {
      setHideChoiceMain(true); // 2 saniye sonra gizle
    }, mainLoadTime);
  };

  return (
    <>
      <div className={`choice-main${hideChoiceMain ? " hidden" : ""}`}>
        <div
          onClick={() => handleSiteTypeChange(1)}
          className={`visa${
            !siteType ? "" : siteType === 1 ? " active" : " deactive"
          }`}
        >
          <div className="choice-content">
            <img
              src={require("../assets/images/vize.png")}
              alt={t("types.typeOne")}
            />
            <span>{t("types.typeOne")}</span>
          </div>
        </div>
        <div
          onClick={() => handleSiteTypeChange(2)}
          className={`education${
            !siteType ? "" : siteType === 2 ? " active" : " deactive"
          }`}
        >
          <div className="choice-content">
            <img
              src={require("../assets/images/yurtdisi.png")}
              alt={t("types.typeTwo")}
            />
            <span>{t("types.typeTwo")}</span>
          </div>
        </div>
      </div>
      <div className="choise-cover">
        {/* <h1>AyaJourney'e Hoşgeldiniz</h1> */}
        <div className="cover_logo">
          <img src={logo} alt="Aya Journey" />
        </div>
      </div>

      <ParticlesComponent id="particles" />
    </>
  );
}
