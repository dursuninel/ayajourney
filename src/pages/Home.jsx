import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function Home() {

  const { activeLanguage, languages, changeLanguage } = useLanguage();
  const { t } = useTranslation();


  return (
    <>
    {t("home.test")}
    <div className="language_modal_head">
          {languages?.map((data, key) =>
            activeLanguage.code === data.code ? (
              <div key={key} className="active">
                <img src={data.flag} alt={data.name} /> {data.name}
              </div>
            ) : (
              <div
                onClick={() => changeLanguage(data.id)}
                key={key}
              >
                <img src={data.flag} alt={data.name} /> {data.name}
              </div>
            )
          )}
        </div>

      {/* Banner */}
      <section style={{position: "relative"}}>
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
                <img src={require("../assets/images/img1.png")} alt="" />
                <img src={require("../assets/images/img2.png")} alt="" />
                <img src={require("../assets/images/img3.png")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
