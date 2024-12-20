import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Dil için context oluşturma
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/services").then((response) => {
      setServices(response.data);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ services }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
