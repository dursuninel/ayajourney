import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import TiltBox from "../components/TiltBox";
import { Link, NavLink } from "react-router-dom";
import ContactForm from "../components/forms/ContactForm";
import BlogSlider from "../components/BlogSlider";
import { useSiteType } from "../context/SiteTypeContext";
import { useGlobal } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import PostSlider from "../components/PostSlider";

const TestimonialSlider = () => {
  const { googleReviews, googleReviewsLoading } = useGlobal();

  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (googleReviewsLoading) return <div>Yükleniyor...</div>;

  return (
    <div className="swiper-container">
      <Swiper
        ref={sliderRef}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView="3"
        loop={true}
        className="testimonial-slider"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Güncel slide indeksini al
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {googleReviews.map((item, index) => (
          <SwiperSlide key={index}>
            {activeIndex + 1 === index ? ( // Eğer bu slide aktif ise tilt uygula
              <TiltBox>
                <Link
                  target="_blank"
                  to={item.author_url}
                  className="testimonial-item"
                >
                  <div className="testi-img">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <h3>{item.author_name}</h3>
                  <h4>{item.relative_time_description}</h4>
                  <div className="testi-content">
                    <p>{item.text.split(" ").slice(0, 35).join(" ") + "..."}</p>
                  </div>
                  <ul>
                    {[1, 2, 3, 4, 5].map((star, key) => (
                      <li
                        key={key}
                        className={star <= item.rating ? "act" : ""}
                      >
                        <i className="fa-solid fa-star"></i>
                      </li>
                    ))}
                  </ul>
                </Link>
              </TiltBox>
            ) : (
              <Link
                target="_blank"
                to={item.author_url}
                className="testimonial-item"
              >
                <div className="testi-img">
                  <i className="fa-solid fa-user"></i>
                </div>
                <h3>{item.author_name}</h3>
                <h4>{item.relative_time_description}</h4>
                <div className="testi-content">
                  <p>{item.text.split(" ").slice(0, 35).join(" ") + "..."}</p>
                </div>
                <ul>
                  {[1, 2, 3, 4, 5].map((star, key) => (
                    <li key={key} className={star <= item.rating ? "act" : ""}>
                      <i className="fa-solid fa-star"></i>
                    </li>
                  ))}
                </ul>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="testi-arrows">
        <i className="fa-solid fa-arrow-left-long" onClick={handlePrev}></i>
        <i className="fa-solid fa-arrow-right-long" onClick={handleNext}></i>
      </div>
    </div>
  );
};

export default function EducationHome() {
  const { siteType, runType } = useSiteType();

  const { services, wbContent } = useGlobal();
  const { activeLanguage } = useLanguage();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/getInstaPost/${activeLanguage.code}`).then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    if (siteType !== 2) {
      runType(2);
    }
  }, []);

  const { t } = useTranslation();

  return (
    <>
      {/* Banner */}
      <section style={{ position: "relative" }}>
        <img
          className="banner-cover"
          src={require("../assets/images/education-banner.png")}
          alt=""
        />
        <div className="banner-content-area">
          <div className="container">
            <div className="banner-content">
              <img
                className="path"
                src={require("../assets/images/path2.png")}
                alt=""
              />
              <span>
                {
                  wbContent?.webText.find(
                    (item) =>
                      item.type === "edu" && item.code_id === "banner_sm_title"
                  ).text
                }
              </span>
              <h1>
                {
                  wbContent?.webText.find(
                    (item) =>
                      item.type === "edu" && item.code_id === "banner_title"
                  ).text
                }
              </h1>
              <p>
                {
                  wbContent?.webText.find(
                    (item) =>
                      item.type === "edu" && item.code_id === "banner_content"
                  ).text
                }
              </p>
              {/* <NavLink to="/visa" className="btn-style">
                Hemen Rezervasyon
              </NavLink> */}
            </div>
          </div>
        </div>
      </section>

      {/* Kartlar */}
      <section className="cards-section education_cards">
        <div className="container">
          <div className="cards-flex">
            {services.map((service, index) => (
              <NavLink
                to={`/service/${service.link}`}
                key={index}
                className="card-item"
              >
                <div className="card-image">
                  <img src={service.image} alt="" />
                </div>
                <h3>{service.title}</h3>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet */}
      <section className="service-section">
        <div className="container">
          <div className="row align-items-center flex-md-row flex-column-reverse">
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">{t("pageText.services")}</span>
                <h2 className="module-title">
                  {
                    wbContent?.uniqWebText.find(
                      (item) => item.code_id === "what_we_title"
                    ).text
                  }
                </h2>
              </div>

              <div className="module-content">
                <p>
                  {
                    wbContent?.uniqWebText.find(
                      (item) => item.code_id === "what_we_content"
                    ).text
                  }
                </p>
              </div>
              <NavLink to="/about-us" className="btn-style">
                {t("pageText.detail_info")}
              </NavLink>
            </div>

            <div className="col-md-6 col-12">
              <div className="flexible-images">
                <TiltBox>
                  <img src={require("../assets/images/img1.png")} alt="" />
                </TiltBox>
                <TiltBox>
                  <img src={require("../assets/images/img2.png")} alt="" />
                </TiltBox>
                <TiltBox>
                  <img src={require("../assets/images/img3.png")} alt="" />
                </TiltBox>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Bizi Seçmelisiniz */}
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <img
                width={"100%"}
                src={require("../assets/images/about.png")}
                alt=""
              />
            </div>
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">{t("pageText.aboutTitle")}</span>
                <h2 className="module-title">
                  {
                    wbContent?.uniqWebText.find(
                      (item) => item.code_id === "why_choose_title"
                    ).text
                  }
                </h2>
              </div>
              <div
                className="module-content"
                dangerouslySetInnerHTML={{
                  __html: wbContent?.uniqWebText.find(
                    (item) => item.code_id === "why_choose_content"
                  ).text,
                }}
              />
              <NavLink to="/about-us" className="btn-style">
                {t("pageText.detail_info")}
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* İnstagram Paylaşımlarımız */}
      {posts.length > 0 && (
        <section>
          <div className="container">
            <div className="module-head">
              <span className="sm-title center">
                {t("pageText.social_media")}
              </span>
              <h2 className="module-title center">
                {t("pageText.insta_title")}
              </h2>
            </div>
            <div className="post_slider">
              <PostSlider posts={posts} />
            </div>
          </div>
        </section>
      )}

      {/* Müşteri Yorumları */}
      <section>
        <div className="container">
          <div className="module-head">
            <span className="sm-title center">
              {t("pageText.person_reviews")}
            </span>
            <h2 className="module-title center">
              {t("pageText.person_story")}
            </h2>
          </div>

          <div className="">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Bloglar */}
      <section>
        <div className="container">
          <div className="module-head">
            <span className="sm-title center">{t("pageText.blogs")}</span>
            <h2 className="module-title center">{t("pageText.lastBlog")}</h2>
          </div>
          <div className="blog_slider">
            <BlogSlider />
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="module-head">
                <span className="sm-title">{t("pageText.contactSmTitle")}</span>
                <h2 className="module-title">{t("pageText.contactTitle")}</h2>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
            <div className="col-lg-6 mob-none">
              <div className="contact-image">
                <img
                  src={require("../assets/images/contact.png")}
                  width={"100%"}
                  alt="Contact"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
