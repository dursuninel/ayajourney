import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

// Dil için context oluşturma
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [wbContent, setwbContent] = useState([]);

  const [loader, setLoader] = useState(true);
  const [packages, setPackages] = useState([]);

  const { activeLanguage } = useLanguage();

  useEffect(() => {
    axios.get("/services").then((response) => {
      setServices(response.data);
    });

    axios
      .get("/getFullText")
      .then((res) => {
        setwbContent(res.data);
      })
      .then(() => {
        setLoader(false);
      });

    axios.get(`/getPackages/${activeLanguage.code}`).then((res) => {
      setPackages(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ services, wbContent, loader, setLoader, packages }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
