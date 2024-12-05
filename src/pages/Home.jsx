import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import TiltBox from "../components/TiltBox";

const MySwiper = () => {
  const images = [
    "post.png",
    "post.png",
    "post.png",
    "post.png",
    "post.png",
    "post.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

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
        className="mySwiper"
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

export default function Home() {
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
              <span>Hedef Yurt Dışıysa</span>
              <h1>Doğru Adrestesiniz!</h1>
              <p>
                Eğitim, iş, ticaret ve diğer vize danışmanlık ihtiyaçlarınız
                için AYA Journey olarak her zaman yanınızdayız!
              </p>
              <a href="/" className="btn-style">
                Hemen Rezervasyon
              </a>
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
                <h2 className="module-title">Biz Kimiz?</h2>
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
              <a href="/" className="btn-style">
                Detaylı Bilgi
              </a>
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
              <a href="/" className="btn-style">
                Detaylı Bilgi
              </a>
            </div>

            <div className="col-md-6 col-12">
              <div className="flexible-images">
                <TiltBox><img src={require("../assets/images/img1.png")} alt="" /></TiltBox>
                <TiltBox><img src={require("../assets/images/img2.png")} alt="" /></TiltBox>
                <TiltBox><img src={require("../assets/images/img3.png")} alt="" /></TiltBox>
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
                  <a href="/" className="btn-style">
                    Hemen Al
                  </a>
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
                  <a href="/" className="btn-style">
                    Hemen Al
                  </a>
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
                  <a href="/" className="btn-style">
                    Hemen Al
                  </a>
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
                <a href="/" className="btn-style">
                  Hemen Al
                </a>
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
                <a href="/" className="btn-style">
                  Hemen Al
                </a>
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
                <a href="/" className="btn-style">
                  Hemen Al
                </a>
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
            <div>
              <h2>Vize Durumunu Kontrol Et!</h2>
              <h3>
                Her 4 vizeden 1'i reddediliyor. Aya Journey ile hemen mümkün!
              </h3>
            </div>
            <div>
              <a href="/" className="btn-style">
                Hemen İncele
              </a>
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
            <MySwiper />
          </div>
        </div>
      </section>
    </>
  );
}
