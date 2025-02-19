import React, { useContext, useEffect, useRef, useState } from "react";
import UsaStepForm from "../components/forms/UsaStepForm";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import Swiper from "swiper";
import { useGlobal } from "../context/GlobalContext";
import { SwiperSlide } from "swiper/react";
import { Toast } from "primereact/toast";
import Modal from "../components/Modal";
import TakePackageForm from "../components/forms/TakePackageForm";

export default function UsaForm() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useContext(UserContext);
  const { packages } = useGlobal();
  const toast = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [pacID, setPacID] = useState(0);
  const [pacModal, setPacModal] = useState(false);

  const handleTakePackage = (id) => {
    setPacID(id);
    setPacModal(true);
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.usa_banner")}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p
            className="page-description"
            dangerouslySetInnerHTML={{ __html: t("pageText.usa_text") }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <UsaStepForm />
        </div>
      </section>

      <section>
        <div className="container">
          {isMobile ? (
            <Swiper autoHeight={true} spaceBetween={16} slidesPerView={1}>
              {packages
                .filter((item) => Number(item.form) === 3)
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
                .filter((item) => Number(item.form) === 3)
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
      </section>

      <Toast ref={toast} position="bottom-center" />
      <Modal setState={setPacModal} state={pacModal} title={"Paket Alın"}>
        <TakePackageForm toast={toast} pacID={pacID} />
      </Modal>
    </>
  );
}
