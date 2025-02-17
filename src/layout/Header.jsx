import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSiteType } from "../context/SiteTypeContext";
import Modal from "../components/Modal";
import AuthArea from "../components/AuthArea";
import { UserContext } from "../context/UserContext";
import FormatUserName from "../components/FormatUserName";
import { useGlobal } from "../context/GlobalContext";
import Dropdown from "../components/Dropdown";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const navigate = useNavigate();

  const { siteType, resetSiteType } = useSiteType();
  const { services } = useGlobal();

  const { login, logout, authMenu, setAuthMenu } = useContext(UserContext);

  const location = useLocation();

  const { languages, changeLanguage, activeLanguage } = useLanguage();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflowY = menuActive ? "auto" : "hidden";
  };

  const [main, setMain] = useState(location.pathname === "/");

  useEffect(() => {
    if (location.pathname === "/visa" || location.pathname === "/education") {
      setMain(true);
    } else {
      setMain(false);
    }

    setMenuActive(false);
  }, [location.pathname]);

  const { t } = useTranslation(); // i18n hook

  return (
    <>
      <div className={`top-header${main ? " main" : ""}`}>
        <div className="header-container">
          <div className="lang_flex">
            {main && (
              <div className="prev" onClick={resetSiteType}>
                <i className="fa-solid fa-arrow-left-long"></i>
              </div>
            )}
            <div>
              <div className="langs">
                {languages
                  .filter((item) => item.id !== activeLanguage.id)
                  .map((lang) => (
                    <span
                      key={lang.title}
                      onClick={() => changeLanguage(lang.id)}
                    >
                      {lang.title}
                    </span>
                  ))}
                <i className="fa-solid fa-globe"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className={`main-header${main ? " main" : ""}`}>
        <div className="header-container">
          <div className={`header-flex ${menuActive ? "active" : ""}`}>
            <div className="header-logo">
              <NavLink to={siteType === 1 ? "/visa" : "/education"}>
                <img
                  src={require("../assets/images/logo.png")}
                  alt="Satılık Acenta Logo"
                />
              </NavLink>
            </div>
            <div className={`header-nav ${menuActive ? "active" : ""}`}>
              <div className="header-burger inner-check">
                <div className="menuToggle" onClick={toggleMenu}>
                  <input type="checkbox" checked={menuActive} readOnly />
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <ul className="navigation-list">
                <li>
                  <NavLink
                    to={siteType === 1 ? "/visa" : "/education"}
                    title={t("pages.home")}
                  >
                    {t("pages.home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us" title={t("pages.about")}>
                    {t("pages.about")}
                  </NavLink>
                </li>

                {/* {siteType === 2 && (
                  
                )} */}

                <Dropdown
                  title={t("pages.services")}
                  data={services.map((service) => ({
                    title: service.title,
                    link: `/service/${service.link}`,
                  }))}
                />

                <li>
                  <NavLink to="/blog" title={t("pages.blogs")}>
                    {t("pages.blogs")}
                  </NavLink>
                </li>

                <Dropdown
                  title={t("pages.forms")}
                  data={[
                    {
                      title: t("forms.uk"),
                      link: `/uk-form`,
                    },
                    {
                      title: t("forms.schengen"),
                      link: `/schengen-form`,
                    },
                    {
                      title: t("forms.usa"),
                      link: "/usa-form",
                    },
                    {
                      title: t("forms.canada"),
                      link: "/canada-form",
                    },
                    {
                      title: t("forms.visa"),
                      link: "/visa-calculate",
                    },
                  ]}
                />

                <li>
                  <NavLink to="/contact" title={t("pages.contact")}>
                    {t("pages.contact")}
                  </NavLink>
                </li>
                <li className="auth_btn">
                  {login === null ? (
                    // Spinner
                    <div className="spinner">
                      <i className="fa-solid fa-spinner fa-spin"></i>{" "}
                      {t("swal.loading")}
                    </div>
                  ) : login === true ? (
                    // Giriş yapılmış menü
                    <div
                      className="auth"
                      onClick={() => navigate("/my-documents")}
                    >
                      <i className="fa-solid fa-user"></i>{" "}
                      {/* {FormatUserName(user.fullname)} */} {t("pages.docs")}
                    </div>
                  ) : (
                    // Giriş Yap
                    <div className="auth" onClick={() => setAuthMenu(true)}>
                      <i className="fa-solid fa-user"></i> {t("pages.login")}
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className="header-burger out-check">
              {/* {main && (
                <div className="lang_flex">
                  <div>
                    <span>
                      TR <i className="fa-solid fa-globe"></i>
                    </span>
                  </div>
                </div>
              )} */}

              <div className="menuToggle" onClick={toggleMenu}>
                <input type="checkbox" checked={menuActive} readOnly />
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div
              className="overlay-header"
              onClick={toggleMenu}
              style={{ display: menuActive ? "block" : "none" }}
            ></div>
          </div>
        </div>
      </header>

      <Modal
        state={authMenu}
        setState={setAuthMenu}
        title={`${t("pages.login")} / ${t("pages.register")}`}
      >
        <AuthArea />
      </Modal>
    </>
  );
}
