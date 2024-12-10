import React, { createContext, useState, useContext, useEffect } from "react";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Dil için context oluşturma
const SiteTypeContext = createContext();

export const SiteTypeProvider = ({ children }) => {
  const [loadPage, setLoadPage] = useState(false);
  const [activeSite, setActiveSite] = useState(false);
  const mainLoadTime = 1200;
  const { t } = useTranslation(); // i18n hook

  const navigate = useNavigate();

  const siteTypes = [
    {
      id: 1,
      name: t("types.typeOne"),
      type: 1,
    },
    {
      id: 2,
      name: t("types.typeTwo"),
      type: 2,
    },
  ];

  const [siteType, setSiteType] = useState(null);

  const changeSiteType = (id) => {
    let type = siteTypes.find((n) => n.type === id).type;
    setSiteType(type);
    setTimeout(() => {
      // setLoadPage(true);

      setTimeout(() => {
        // setLoadPage(false);
        // setActiveSite(true);
        if (type === 1) {
          // navigate("/visa");
        }
        else{
          // navigate("/education");
        }
      }, 1000);
    }, mainLoadTime);
  };

  const resetSiteType = () => {
    setSiteType(null);
    setActiveSite(false);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("siteType", siteType);
  }, [siteType]);

  return (
    <SiteTypeContext.Provider
      value={{ resetSiteType, activeSite, mainLoadTime, siteType, changeSiteType }}
    >
      {loadPage && <Loader />}
      {children}
    </SiteTypeContext.Provider>
  );
};

export const useSiteType = () => useContext(SiteTypeContext);
