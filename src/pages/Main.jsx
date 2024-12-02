import React, { useEffect, useState } from "react";
import { useSiteType } from "../context/SiteTypeContext";

export default function Main() {
  const { siteType, changeSiteType } = useSiteType();

  const [hideChoiceMain, setHideChoiceMain] = useState(false); // .choice-main görünürlük kontrolü

  const handleSiteTypeChange = (id) => {
    changeSiteType(id); // Site tipini değiştir
    setTimeout(() => {
      setHideChoiceMain(true); // 2 saniye sonra gizle
    }, 1500);
  };

  return (
    <>
      {!hideChoiceMain && (
        <>
          <div className="choice-main">
            <div
              onClick={() => handleSiteTypeChange(1)}
              className={`visa${
                !siteType ? "" : siteType === 1 ? " active" : " deactive"
              }`}
            >
              <div className="choice-content">
                <img src={require("../assets/images/vize.png")} alt="" />
                <a href="/">
                  Vize <i class="fa-solid fa-arrow-right"></i>
                </a>
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
                <a href="/">
                  Yurtdışı Eğitim <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
