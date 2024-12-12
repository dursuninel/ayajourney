import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSiteType } from "../context/SiteTypeContext";
import Modal from "../components/Modal";
import AuthArea from "../components/AuthArea";
import { UserContext } from "../context/UserContext";
import FormatUserName from "../components/FormatUserName";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const { resetSiteType } = useSiteType();

  const { user, login, logout, authMenu, setAuthMenu } =
    useContext(UserContext);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflowY = menuActive ? "auto" : "hidden";
  };

  const [main, setMain] = useState(location.pathname === "/");

  useEffect(() => {
    if (location.pathname === "/visa") {
      setMain(true);
    } else {
      setMain(false);
    }
  }, [location.pathname]);

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
              <span>
                TR <i className="fa-solid fa-globe"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <header className={`main-header${main ? " main" : ""}`}>
        <div className="header-container">
          <div className={`header-flex ${menuActive ? "active" : ""}`}>
            <div className="header-logo">
              <NavLink to="/visa">
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
                  <NavLink to="/visa" title="Anasayfa">
                    Anasayfa
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hakkimizda" title="Hakkımızda">
                    Hakkımızda
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hizmetler" title="Hizmetler">
                    Hizmetler
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" title="Blog">
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/form" title="Form">
                    Form
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/iletisim" title="İletişim">
                    İletişim
                  </NavLink>
                </li>
                <li className="auth_btn">
                  {login === null ? (
                    // Spinner
                    <div className="spinner">
                      <i className="fa-solid fa-spinner fa-spin"></i>{" "}
                      Yükleniyor...
                    </div>
                  ) : login === true ? (
                    // Giriş yapılmış menü
                    <div className="auth" onClick={logout}>
                      <i className="fa-solid fa-user"></i>{" "}
                      {FormatUserName(user.fullname)}
                    </div>
                  ) : (
                    // Giriş Yap
                    <div className="auth" onClick={() => setAuthMenu(true)}>
                      <i className="fa-solid fa-user"></i> Giriş Yap
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className="header-burger out-check">
              <div className="lang_flex">
                <div>
                  <span>
                    TR <i className="fa-solid fa-globe"></i>
                  </span>
                </div>
              </div>
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
        title={"Giriş Yap / Kayıt Ol"}
      >
        <AuthArea />
      </Modal>
    </>
  );
}
