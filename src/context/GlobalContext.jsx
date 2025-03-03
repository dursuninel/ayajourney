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

  const [googleReviews, setGoogleReviews] = useState([]);
  const [googleReviewsLoading, setGoogleReviewsLoading] = useState(true);

  useEffect(() => {
    try {
      // Google Yorumları
      const fetchReviews = async () => {
        try {
          const placeid = process.env.REACT_APP_PLACE_ID;
          const key = process.env.REACT_APP_PLACE_KEY;
          const language = "tr";

          const url = `https://proxy.cors.sh/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${key}&language=${language}`;
          const headers = {
            "x-cors-api-key": process.env.REACT_APP_X_CORS_API_KEY,
            "access-control-allow-origin": "*",
            "x-requested-with": "XMLHttpRequest",
            "content-type": "application/json",
          };

          const response = await fetch(url, { headers });
          const data = await response.json();

          if (response.ok) {
            return data.result.reviews;
          } else {
            throw new Error(`API hatası: ${response.status}`);
          }
        } catch (error) {
          console.error(`Hata: ${error.message}`);
          return [];
        }
      };
      const loadReviews = async () => {
        const fetchedReviews = await fetchReviews();
        console.log(fetchedReviews)
        setGoogleReviews(fetchedReviews);
        setGoogleReviewsLoading(false);
      };

      loadReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        services,
        wbContent,
        loader,
        setLoader,
        packages,

        googleReviews,
        googleReviewsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
