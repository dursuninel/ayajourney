import React, { useEffect, useState } from "react";

import PageBanner from "../components/PageBanner";
import TiltBox from "../components/TiltBox";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

export default function Blog() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/blogs").then((response) => {
      setDatas(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageBanner title={"Bloglar"} />

      <section>
        <div
          className="container"
          style={{ position: "relative", minHeight: "15rem" }}
        >
          {loading && <Loader />}
          {!loading && (
            <div className="blog_list">
              {datas.map((item, index) => (
                <TiltBox>
                  <NavLink to={`/blog/${item.link}`} className="blog-item">
                    <img src={item.image} alt={item.title} />
                    <div className="blog-card-content">
                      <span className="date">{new Date(item.date).toLocaleDateString("tr-TR")}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </NavLink>
                </TiltBox>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
