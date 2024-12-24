import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";

import TiltBox from "../components/TiltBox";
import { NavLink } from "react-router-dom";
import ContactForm from "../components/forms/ContactForm";
import BlogSlider from "../components/BlogSlider";
import { useSiteType } from "../context/SiteTypeContext";

const PostSlider = () => {
  const images = [
    "post.png",
    "post.png",
    "post.png",
    "post.png",
    "post.png",
    "post.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const { siteType, runType } = useSiteType();

  useEffect(() => {
    if (siteType !== 1) {
      runType(1);
    }
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Güncel slide indeksini al
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            {activeIndex === index ? ( // Eğer bu slide aktif ise tilt uygula
              <TiltBox>
                <img
                  src={require(`../assets/images/${src}`)}
                  alt={`Slide ${index + 1}`}
                />
              </TiltBox>
            ) : (
              <img
                src={require(`../assets/images/${src}`)}
                alt={`Slide ${index + 1}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <span>Hedef Vize Alımıysa</span>
              <h1>Doğru Adrestesiniz!</h1>
              <p>
                Eğitim, iş, ticaret ve diğer vize danışmanlık ihtiyaçlarınız
                için AYA Journey olarak her zaman yanınızdayız!
              </p>
              <NavLink to="/visa" className="btn-style">
                Hemen Rezervasyon
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Kartlar */}
      <section className="cards-section">
        <div className="container">
          <div className="cards-flex">
            <div className="card-item">
              <div className="card-image">
                <img src={require("../assets/images/card1.png")} alt="" />
              </div>
              <h3>Hız</h3>
            </div>
            <div className="card-item">
              <div className="card-image">
                <img src={require("../assets/images/card2.png")} alt="" />
              </div>
              <h3>Kaliteli Hizmet</h3>
            </div>
            <div className="card-item">
              <div className="card-image">
                <img src={require("../assets/images/card3.png")} alt="" />
              </div>
              <h3>Müşteri Memnuniyeti</h3>
            </div>
            <div className="card-item">
              <div className="card-image">
                <img src={require("../assets/images/card4.png")} alt="" />
              </div>
              <h3>7/24 İletişim</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet */}
      <section className="service-section">
        <div className="container">
          <div className="row align-items-center flex-md-row flex-column-reverse">
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">Hizmetlerimiz</span>
                <h2 className="module-title">Neler Sunuyoruz</h2>
              </div>

              <div className="module-content">
                <p>
                  ABD turist vizesi başta olmak üzere, yararlanmak istediğiniz
                  her türlü yurtdışı hizmeti için alanında uzman
                  danışmanlarımızla yurtdışı planlarınızı birlikte gerçeğe
                  dönüştürüyoruz.
                </p>
              </div>
              <NavLink to="/about-us" className="btn-style">
                Detaylı Bilgi
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
            <span className="sm-title center">Paketler</span>
            <h2 className="module-title center">Paket Hizmetlerimiz</h2>
          </div>
          {isMobile ? (
            <Swiper autoHeight={true} spaceBetween={16} slidesPerView={1}>
              <SwiperSlide className="package-item">
                <div>
                  <div>
                    <h3 className="pckg-title">Vize Hizmeti</h3>
                    <p className="pckg-price">$89</p>
                    <span>* Devlet ücretleri dahildir</span>
                  </div>
                  <NavLink to="#" className="btn-style">
                    Hemen Al
                  </NavLink>
                  <div>
                    <h4>Pakete Dahil olan özellikler</h4>
                    <ul>
                      <li>Kişisel vize danışmanının tüm avantajları</li>
                      <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                      <li>Kullanıcı dostu dijital araçlar</li>
                      <li>Onlarca yıllık deneyim</li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="package-item most-populer">
                <div>
                  <div className="most-populer-btn">En Popüler</div>
                  <div>
                    <h3 className="pckg-title">ABD Vize Hizmeti</h3>
                    <p className="pckg-price">$175</p>
                    <span>* Devlet ücretleri dahildir</span>
                  </div>
                  <NavLink to="#" className="btn-style">
                    Hemen Al
                  </NavLink>
                  <div>
                    <h4>Pakete Dahil olan özellikler</h4>
                    <ul>
                      <li>Kişisel vize danışmanının tüm avantajları</li>
                      <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                      <li>Kullanıcı dostu dijital araçlar</li>
                      <li>Onlarca yıllık deneyim</li>
                      <li>Bir kerelik nezaketen yeniden işleme</li>
                      <li>Çok daha fazlası ...</li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="package-item">
                <div>
                  <div>
                    <h3 className="pckg-title">VIP Vize Hizmeti</h3>
                    <p className="pckg-price">$495</p>
                    <span>* Devlet ücretleri dahildir</span>
                  </div>
                  <NavLink to="#" className="btn-style">
                    Hemen Al
                  </NavLink>
                  <div>
                    <h4>Pakete Dahil olan özellikler</h4>
                    <ul>
                      <li>Kişisel vize danışmanının tüm avantajları</li>
                      <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                      <li>Kullanıcı dostu dijital araçlar</li>
                      <li>Onlarca yıllık deneyim</li>
                      <li>Bir kerelik nezaketen yeniden işleme</li>
                      <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                      <li>Kullanıcı dostu dijital araçlar</li>
                      <li>Çok daha fazlası ...</li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          ) : (
            <div className="packages-flex">
              <div className="package-item">
                <div>
                  <h3 className="pckg-title">Vize Hizmeti</h3>
                  <p className="pckg-price">$89</p>
                  <span>* Devlet ücretleri dahildir</span>
                </div>
                <NavLink to="#" className="btn-style">
                  Hemen Al
                </NavLink>
                <div>
                  <h4>Pakete Dahil olan özellikler</h4>
                  <ul>
                    <li>Kişisel vize danışmanının tüm avantajları</li>
                    <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                    <li>Kullanıcı dostu dijital araçlar</li>
                    <li>Onlarca yıllık deneyim</li>
                  </ul>
                </div>
              </div>
              <div className="package-item most-populer">
                <div className="most-populer-btn">En Popüler</div>
                <div>
                  <h3 className="pckg-title">ABD Vize Hizmeti</h3>
                  <p className="pckg-price">$175</p>
                  <span>* Devlet ücretleri dahildir</span>
                </div>
                <NavLink to="#" className="btn-style">
                  Hemen Al
                </NavLink>
                <div>
                  <h4>Pakete Dahil olan özellikler</h4>
                  <ul>
                    <li>Kişisel vize danışmanının tüm avantajları</li>
                    <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                    <li>Kullanıcı dostu dijital araçlar</li>
                    <li>Onlarca yıllık deneyim</li>
                    <li>Bir kerelik nezaketen yeniden işleme</li>
                    <li>Çok daha fazlası ...</li>
                  </ul>
                </div>
              </div>
              <div className="package-item">
                <div>
                  <h3 className="pckg-title">VIP Vize Hizmeti</h3>
                  <p className="pckg-price">$495</p>
                  <span>* Devlet ücretleri dahildir</span>
                </div>
                <NavLink to="#" className="btn-style">
                  Hemen Al
                </NavLink>
                <div>
                  <h4>Pakete Dahil olan özellikler</h4>
                  <ul>
                    <li>Kişisel vize danışmanının tüm avantajları</li>
                    <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                    <li>Kullanıcı dostu dijital araçlar</li>
                    <li>Onlarca yıllık deneyim</li>
                    <li>Bir kerelik nezaketen yeniden işleme</li>
                    <li>Dünyanın her yerinde 7/24 sınırsız destek</li>
                    <li>Kullanıcı dostu dijital araçlar</li>
                    <li>Çok daha fazlası ...</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vize Durum Kontrolü */}
      <section>
        <div className="container">
          <div className="visa_status">
            <span className="check">
              <i className="fa-solid fa-check"></i>
            </span>
            <div>
              <h2>Vize görüşmesine hazır mısın?</h2>
              <h3>
                Her 4 vizeden 1'i reddediliyor. Aya Journey ile hemen mümkün!
              </h3>
              <NavLink to="#" className="btn-style transparent mt-4">
                Hemen İncele
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
                <span className="sm-title">Hakkımızda</span>
                <h2 className="module-title">Neden Bizi Seçmelisiniz?</h2>
              </div>
              <div className="module-content">
                <p>
                  Vize almak, uluslararası seyahatlerde karşılaşabileceğiniz en
                  önemli adımlardan biridir ve bu sürecin karmaşıklığı herkes
                  için sorun yaratabilir.
                </p>
                <br />
                <p>
                  Vize Danışmanlık olarak, sizlere bu süreci daha kolay ve
                  sorunsuz bir şekilde geçirmeniz için uzman rehberlik
                  sunuyoruz.
                </p>
              </div>
              <NavLink to="/about-us" className="btn-style">
                Detaylı Bilgi
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* İnstagram Paylaşımlarımız */}
      <section>
        <div className="container">
          <div className="module-head">
            <span className="sm-title center">Sosyal Medya</span>
            <h2 className="module-title center">İnstagram Paylaşımlarımız</h2>
          </div>
          <div className="post_slider">
            <PostSlider />
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section>
        <div className="container">
          <div className="module-head">
            <span className="sm-title center">Müşteri Yorumları</span>
            <h2 className="module-title center">Müşterilerimizden Hikayeler</h2>
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
            <span className="sm-title center">Bloglar</span>
            <h2 className="module-title center">Son Bloglar</h2>
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
                <span className="sm-title">İletişim</span>
                <h2 className="module-title">Bizimle İletişime Geçin</h2>
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
              <h2>Hemen Rezervayon</h2>
              <h3>
                Her 4 vizeden 1'i reddediliyor. Aya Journey ile hemen mümkün!
              </h3>
              <NavLink to="#" className="btn-style transparent mt-4">
                Detaylı Bilgi
              </NavLink>
            </div>
            <div>
              <img src={require("../assets/images/flags.png")} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
