import React, { createContext, useState, useContext, useEffect } from "react";
import i18n from "../i18n";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

// Dil için context oluşturma
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [loadPage, setLoadPage] = useState(false);
  const { t } = useTranslation(); // i18n hook

  const languagesData = [
    {
      id: 1,
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png",
      name: "Türkçe",
      title: "TR",
      code: "tr",
    },
    {
      id: 2,
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg",
      name: "İngilizce",
      title: "EN",
      code: "en",
    },
  ];

  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    return savedLanguage
      ? languagesData.find((lang) => lang.code === savedLanguage)
      : languagesData[0];
  };

  const [languages, setLanguages] = useState(languagesData);
  const [activeLanguage, setActiveLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (activeLanguage) {
      i18n.changeLanguage(activeLanguage.code);
    }
  }, [activeLanguage]);

  const changeLanguage = (id) => {
    setLoadPage(true);
    const selectedLanguage = languages.find((lang) => lang.id === id);
    if (selectedLanguage) {
      localStorage.setItem("selectedLanguage", selectedLanguage.code);
      setActiveLanguage(selectedLanguage);
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider
      value={{ activeLanguage, languages, changeLanguage }}
    >
      {loadPage && <Loader />}
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
