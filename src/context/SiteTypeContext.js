import React, { createContext, useState, useContext, useEffect } from "react";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

// Dil için context oluşturma
const SiteTypeContext = createContext();

export const SiteTypeProvider = ({ children }) => {
  const [loadPage, setLoadPage] = useState(false);
  const [activeSite, setActiveSite] = useState(false);
  const mainLoadTime = 1200;
  const { t } = useTranslation(); // i18n hook

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
    setSiteType(siteTypes.find((n) => n.type === id).type);
    setTimeout(() => {
      setLoadPage(true);

      setTimeout(() => {
        setLoadPage(false);
        setActiveSite(true)
      }, 1000);
    }, mainLoadTime);
  };

  useEffect(() => {
    console.log("Site türü değişti : ", siteType);
  }, [siteType]);

  return (
    <SiteTypeContext.Provider
      value={{ activeSite, mainLoadTime, siteType, changeSiteType }}
    >
      {loadPage && <Loader />}
      {children}
    </SiteTypeContext.Provider>
  );
};

export const useSiteType = () => useContext(SiteTypeContext);
