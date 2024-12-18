import React, { useState } from "react";

import PageBanner from "../components/PageBanner";
import TiltBox from "../components/TiltBox";
import { NavLink } from "react-router-dom";

export default function Blog() {
  const [datas, setDatas] = useState([
    {
      id: 1,
      title: "Blog Başlığı",
      date: "20.07.2003",
      image: require("../assets/images/blog.png"),
    },
    {
      id: 2,
      title: "Blog Başlığı",
      date: "20.07.2003",
      image: require("../assets/images/blog.png"),
    },
    {
      id: 3,
      title: "Blog Başlığı",
      date: "20.07.2003",
      image: require("../assets/images/blog.png"),
    },
    {
      id: 4,
      title: "Blog Başlığı",
      date: "20.07.2003",
      image: require("../assets/images/blog.png"),
    },
  ]);

  return (
    <>
      <PageBanner title={"Bloglar"} />

      <section>
        <div className="container">
          <div className="blog_list">
            {datas.map((item, index) => (
              <TiltBox>
                <NavLink to={`/visa/blog/${item.id}`} className="blog-item">
                  <img src={item.image} alt={item.title} />
                  <div className="blog-card-content">
                    <span className="date">{item.date}</span>
                    <h3>{item.title}</h3>
                  </div>
                </NavLink>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
