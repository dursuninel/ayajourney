import React from "react";

import PageBanner from "../components/PageBanner";
import ContactForm from "../components/forms/ContactForm";

export default function Service() {
  return (
    <>
      <PageBanner title={"Hizmetler"} />
      <section>
        <div className="container">
          <div className="row flex-md-row flex-column-reverse gap-md-0 gap-2">
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">Hizmetler</span>
                <h2 className="module-title">Vize Hizmeti</h2>
              </div>
              <div className="module-content">
                <p>
                  Vize almak, uluslararası seyahatlerde karşılaşabileceğiniz en
                  önemli adımlardan biridir ve bu sürecin karmaşıklığı herkes
                  için sorun yaratabilir. Vize Danışmanlık olarak, sizlere bu
                  süreci daha kolay ve sorunsuz bir şekilde geçirmeniz için
                  uzman rehberlik sunuyoruz.
                </p>
                <br />
                <p>
                  Misyonumuz, müşterilerimize özgün ve kişiselleştirilmiş vize
                  çözümleri sunarak seyahat hayallerini gerçeğe dönüştürmelerine
                  yardımcı olmak ve her adımda yanlarında olmaktır. Müşteri
                  memnuniyeti ve güveni bizim için önceliklidir, ve her vize
                  başvurusunu titizlikle yönetirken müşterilerimizin
                  ihtiyaçlarına özel çözümler sunmayı taahhüt ediyoruz.
                </p>
                <br />
                <p>
                  Vize Danışmanlık olarak, deneyimli bir ekip ve derinlemesine
                  bilgiye sahip bir danışmanlar ağı ile size rehberlik ediyoruz.
                  Yurtdışında çalışma, eğitim, turistik ziyaretler veya aile
                  ziyaretleri gibi farklı vize türlerinde uzmanız ve her
                  müşterimize en iyi hizmeti sunmak için çalışıyoruz.
                </p>
                <br />
                <p>
                  Sizleri, hayatınızın en önemli maceralarını keşfetmeye ve yeni
                  yerler görmeye davet ediyoruz. Vize Danışmanlık olarak, vize
                  başvurularınızı kolaylaştırmak ve seyahatlerinizi unutulmaz
                  kılmak için buradayız. Birlikte yeni ufuklara doğru adım
                  atalım!
                </p>
                <br />
                <p>
                  Vize almak, uluslararası seyahatlerde karşılaşabileceğiniz en
                  önemli adımlardan biridir ve bu sürecin karmaşıklığı herkes
                  için sorun yaratabilir. Vize Danışmanlık olarak, sizlere bu
                  süreci daha kolay ve sorunsuz bir şekilde geçirmeniz için
                  uzman rehberlik sunuyoruz.
                </p>
                <br />
                <p>
                  Vize almak, uluslararası seyahatlerde karşılaşabileceğiniz en
                  önemli adımlardan biridir ve bu sürecin karmaşıklığı herkes
                  için sorun yaratabilir. Vize Danışmanlık olarak, sizlere bu
                  süreci daha kolay ve sorunsuz bir şekilde geçirmeniz için
                  uzman rehberlik sunuyoruz.
                </p>
              </div>
              <br />
            </div>
            <div className="col-md-6 col-12">
              <img
                width={"100%"}
                src={require("../assets/images/fly.png")}
                alt="Fly"
                style={{ borderRadius: "1rem" }}
              />
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
