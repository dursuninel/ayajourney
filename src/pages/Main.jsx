import React, { useEffect, useState } from "react";
import { useSiteType } from "../context/SiteTypeContext";

export default function Main() {
  const { mainLoadTime, siteType, changeSiteType, resetSiteType } = useSiteType();

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
            <img src={require("../assets/images/vize.png")} alt="" />
            <span>
              Vize <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
        <div
          onClick={() => handleSiteTypeChange(2)}
          className={`education${
            !siteType ? "" : siteType === 2 ? " active" : " deactive"
          }`}
        >
          <div className="choice-content">
            <img src={require("../assets/images/yurtdisi.png")} alt="" />
            <span>
              Yurtdışı Eğitim <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
