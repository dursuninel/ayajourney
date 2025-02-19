import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import TiltBox from "../components/TiltBox";
import { NavLink } from "react-router-dom";
import ContactForm from "../components/forms/ContactForm";
import BlogSlider from "../components/BlogSlider";
import { useSiteType } from "../context/SiteTypeContext";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import { useGlobal } from "../context/GlobalContext";
import { UserContext } from "../context/UserContext";
import { Toast } from "primereact/toast";
import Modal from "../components/Modal";
import TakePackageForm from "../components/forms/TakePackageForm";
import { useTranslation } from "react-i18next";
import PostSlider from "../components/PostSlider";

const TestimonialSlider = () => {
  const [datas, setDatas] = useState([
    {
      id: 1,
      fullname: "Dursun İnel",
      title: "Misafir",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi id possimus qui quos nesciunt?",
      star: 4,
    },
    {
      id: 2,
      fullname: "Dursun İnel",
      title: "Misafir",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi id possimus qui quos nesciunt?",
      star: 4,
    },
    {
      id: 3,
      fullname: "Dursun İnel",
      title: "Misafir",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi id possimus qui quos nesciunt?",
      star: 4,
    },
    {
      id: 4,
      fullname: "Dursun İnel",
      title: "Misafir",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem animi id possimus qui quos nesciunt?",
      star: 2,
    },
  ]);

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
        {datas.map((item, index) => (
          <SwiperSlide key={index}>
            {activeIndex + 1 === index ? ( // Eğer bu slide aktif ise tilt uygula
              <TiltBox>
                <div className="testimonial-item">
                  <div className="testi-img">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <h3>{item.fullname}</h3>
                  <h4>{item.title}</h4>
                  <div className="testi-content">
                    <p>{item.content}</p>
                  </div>
                  <ul>
                    {[1, 2, 3, 4, 5].map((star, key) => (
                      <li key={key} className={star <= item.star ? "act" : ""}>
                        <i className="fa-solid fa-star"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltBox>
            ) : (
              <div className="testimonial-item">
                <div className="testi-img">
                  <i className="fa-solid fa-user"></i>
                </div>
                <h3>{item.fullname}</h3>
                <h4>{item.title}</h4>
                <div className="testi-content">
                  <p>{item.content}</p>
                </div>
                <ul>
                  {[1, 2, 3, 4, 5].map((star, key) => (
                    <li key={key} className={star <= item.star ? "act" : ""}>
                      <i className="fa-solid fa-star"></i>
                    </li>
                  ))}
                </ul>
              </div>
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

export default function VisaHome() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const { activeLanguage } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [visaCards, setVisaCards] = useState([]);

  const [posts, setPosts] = useState([]);

  const toast = useRef();

  const { wbContent, packages } = useGlobal();

  useEffect(() => {
    axios.get(`/visaCards/${activeLanguage.code}`).then((res) => {
      setVisaCards(res.data);
    });

    axios.get(`/getInstaPost/${activeLanguage.code}`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const [pacID, setPacID] = useState(0);
  const [pacModal, setPacModal] = useState(false);

  const handleTakePackage = (id) => {
    setPacID(id);
    setPacModal(true);
  };

  return (
    <>
      {/* Banner */}
      <section style={{ position: "relative" }}>
        <img
          className="banner-cover"
          src={require("../assets/images/ayajourney-banner.png")}
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
                      item.type === "visa" && item.code_id === "banner_sm_title"
                  ).text
                }
              </span>
              <h1>
                {
                  wbContent?.webText.find(
                    (item) =>
                      item.type === "visa" && item.code_id === "banner_title"
                  ).text
                }
              </h1>
              <p>
                {
                  wbContent?.webText.find(
                    (item) =>
                      item.type === "visa" && item.code_id === "banner_content"
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
      <section className="cards-section">
        <div className="container">
          <div className="cards-flex">
            {visaCards.map((card, index) => (
              <div key={index} className="card-item">
                <div>
                  <div className="card-image">
                    <img src={card.image} alt="" />
                  </div>
                  <h3>{card.title}</h3>
                </div>
                <div dangerouslySetInnerHTML={{ __html: card.text }} />
              </div>
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

      {/* Paketler */}
      <section>
        <div className="container">
          <div className="module-head">
            <span className="sm-title center">
              {t("pageText.packagesSmTitle")}
            </span>
            <h2 className="module-title center">
              {t("pageText.packagesTitle")}
            </h2>
          </div>
          {isMobile ? (
            <Swiper autoHeight={true} spaceBetween={16} slidesPerView={1}>
              {packages
                .filter((item) => item.isMain === 1)
                .map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className={`package-item${
                      Number(item.popular) === 1 ? "most-populer" : ""
                    }`}
                  >
                    <div>
                      {Number(item.popular) === 1 && (
                        <div className="most-populer-btn">
                          {t("pageText.bestPopuler")}
                        </div>
                      )}
                      <div>
                        <h3 className="pckg-title">{item.title}</h3>
                        {user?.id ? (
                          <p className="pckg-price">{item.price}</p>
                        ) : (
                          <p className="pckg-price-message">
                            {t("pageText.showPrice")}
                          </p>
                        )}

                        <span>{t("pageText.inPriceText")}</span>
                      </div>
                      <button
                        onClick={() => handleTakePackage(item.id)}
                        className="btn-style w-100"
                      >
                        {t("pageText.nowTake")}
                      </button>
                      <div>
                        <h4>{t("pageText.packageAttr")}</h4>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              +
            </Swiper>
          ) : (
            <div className="packages-flex">
              {packages
                .filter((item) => item.isMain === 1)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`package-item${
                      Number(item.popular) === 1 ? " most-populer" : ""
                    }`}
                  >
                    {Number(item.popular) === 1 && (
                      <div className="most-populer-btn">
                        {t("pageText.bestPopuler")}
                      </div>
                    )}

                    <div>
                      <h3 className="pckg-title">{item.title}</h3>
                      {user?.id ? (
                        <p className="pckg-price">{item.price}</p>
                      ) : (
                        <p className="pckg-price-message">
                          {t("pageText.showPrice")}
                        </p>
                      )}
                      <span>{t("pageText.inPriceText")}</span>
                    </div>
                    <button
                      onClick={() => handleTakePackage(item.id)}
                      className="btn-style w-100"
                    >
                      {t("pageText.nowTake")}
                    </button>
                    <div>
                      <h4>{t("pageText.packageAttr")}</h4>
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <Toast ref={toast} position="bottom-center" />
        <Modal setState={setPacModal} state={pacModal} title={"Paket Alın"}>
          <TakePackageForm toast={toast} pacID={pacID} />
        </Modal>
      </section>

      {/* Vize Durum Kontrolü */}
      <section>
        <div className="container">
          <div className="visa_status">
            <span className="check">
              <i className="fa-solid fa-check"></i>
            </span>
            <div>
              <h2>
                {
                  wbContent?.uniqWebText.find(
                    (item) => item.code_id === "visa_direct_title"
                  ).text
                }
              </h2>
              <h3>
                {
                  wbContent?.uniqWebText.find(
                    (item) => item.code_id === "visa_direct_content"
                  ).text
                }
              </h3>
              <NavLink
                to="/visa-calculate"
                className="btn-style transparent mt-4"
              >
                {t("pageText.now_examine")}
              </NavLink>
            </div>
            <div>
              <img src={require("../assets/images/visa_status.png")} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
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

      <section>
        <div className="container">
          <div className="rezervation_module">
            <div>
              <h2>
                {
                  wbContent?.uniqWebText.find(
                    (item) => item.code_id === "visa_direct_title"
                  ).text
                }
              </h2>
              <h3>
                {
                  wbContent?.uniqWebText.find(
                    (item) => item.code_id === "visa_direct_content"
                  ).text
                }
              </h3>
              <NavLink to="#" className="btn-style transparent mt-4">
                {t("pageText.detail_info")}
              </NavLink>
            </div>
            <div>
              <img
                src={require("../assets/images/flags.png")}
                alt="Aya Journey"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
