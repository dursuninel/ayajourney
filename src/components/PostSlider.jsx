import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import TiltBox from "./TiltBox";

export default function PostSlider({ posts }) {
  const [activePostIndex, setActivePostIndex] = useState(0);

  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideNext(); // İlk yüklemede bir sonraki slide'a kaydır
    }
  }, [swiperInstance]);

  return (
    <>
      {posts.length < 2 && (
        <div className="postSliderTwo">
          {posts.length !== 0 &&
            posts.map((item, index) => (
              <TiltBox key={index}>
                <img src={item.post_url} alt={`Instagram`} />
              </TiltBox>
            ))}
        </div>
      )}

      {posts.length > 2 && (
        <div className="swiper-container">
          <Swiper
            key={posts.length}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="2"
            loop={true}
            coverflowEffect={{
              rotate: 10,
              stretch: 5,
              depth: 400,
              modifier: 1,
            }}
            modules={[EffectCoverflow]}
            className="postSlider"
            onSwiper={setSwiperInstance} // Swiper instance'ını al
            onSlideChange={(swiper) => setActivePostIndex(swiper.realIndex)} // Güncel slide indeksini al
          >
            {posts.length !== 0 &&
              posts.map((item, index) => (
                <SwiperSlide key={index}>
                  {activePostIndex === index ? ( // Eğer bu slide aktif ise tilt uygula
                    <TiltBox>
                      <img src={item.post_url} alt={`Instagram`} />
                    </TiltBox>
                  ) : (
                    <img src={item.post_url} alt={`Instagram`} />
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
