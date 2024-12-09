import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSiteType } from "../context/SiteTypeContext";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [lastNavItemActive, setLastNavItemActive] = useState(false);
  
  const { resetSiteType } = useSiteType();
  

  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.body.style.overflowY = menuActive ? "auto" : "hidden";
  };

  const toggleLastNavItem = () => {
    setLastNavItemActive(!lastNavItemActive);
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: `Türkçe`, code: "tr" },
    { name: `İngilizce`, code: "en" },
  ];

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
                <i class="fa-solid fa-arrow-left-long"></i>
              </div>
            )}
            <div>
              <span>
                TR <i class="fa-solid fa-globe"></i>
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
                  <i class="fa-solid fa-user"></i> Giriş Yap
                </li>
              </ul>
            </div>
            <div className="header-burger out-check">
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
    </>
  );
}
