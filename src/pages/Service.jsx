import React, { useEffect, useState } from "react";

import PageBanner from "../components/PageBanner";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Contact from "./Modules/Contact";

export default function Service() {
  const { link } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get(`/webService/${link}`).then((response) => {
      setData(response.data);
      document.title = `${response.data.title} | AYA Journey`;

      setLoading(false);
    });
  }, [link]);

  return (
    <>
      {loading && <Loader position={"fixed"} />}
      {!loading && (
        <>
          <PageBanner title={data.title} />
          <section>
            <div className="container">
              <div className="row flex-md-row flex-column-reverse gap-md-0 gap-2">
                <div className="col-md-6 col-12">
                  <div className="module-head">
                    <span className="sm-title">Hizmetler</span>
                    <h2 className="module-title">{data.title}</h2>
                  </div>
                  <div
                    className="module-content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                  <br />
                </div>
                <div
                  className="col-md-6 col-12"
                  style={{ position: "relative" }}
                >
                  <img
                    width={"100%"}
                    src={data.image}
                    alt={data.title}
                    style={{
                      borderRadius: "1rem",
                      position: "sticky",
                      insetBlockStart: "1rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <Contact />
        </>
      )}
    </>
  );
}
