import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import TiltBox from "./TiltBox";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

export default function BlogSlider() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("/blogs").then((response) => {
      setDatas(response.data);
      setLoading(false);
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="swiper-container">
      {loading && <Loader position={"absolute"} />}
      {!loading && (
        <>
          <Swiper
            grabCursor={true}
            centeredSlides={false}
            slidesPerView="3"
            loop={true}
            className="blog-slider"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Güncel slide indeksini al
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
          >
            {datas.map((item, index) => (
              <SwiperSlide key={index}>
                <TiltBox>
                  <NavLink to={`/blog/${item.link}`} className="blog-item">
                    <img src={item.image} alt={item.title} />
                    <div className="blog-card-content">
                      <span className="date">{item.date}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </NavLink>
                </TiltBox>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
