import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Dil için context oluşturma
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [wbContent, setwbContent] = useState([]);

  useEffect(() => {
    axios.get("/services").then((response) => {
      setServices(response.data);
    });

    axios.get("/getFullText").then((res) => {
      setwbContent(res.data);
      console.log(res.data)
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ services, wbContent }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
