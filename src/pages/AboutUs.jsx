import React from "react";

import PageBanner from "../components/PageBanner";

export default function Home() {
  return (
    <>
      <PageBanner title={"Hakkımızda"} />

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
                  2022 yılında kurulan AYA Journey, seyahat ve uluslararası
                  deneyimlerin kapılarını açma misyonuyla yola çıktı. Bizler,
                  müşterilerimizin dünya genelindeki keşiflerini ve maceralarını
                  gerçekleştirmelerine yardımcı olma vizyonuyla hareket
                  ediyoruz.
                </p>
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
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row align-items-center flex-md-row flex-column-reverse gap-md-0 gap-2">
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">Biz Kimiz ?</span>
                <h2 className="module-title">Hikayemiz</h2>
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
              </div>
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
    </>
  );
}
