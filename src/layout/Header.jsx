import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [lastNavItemActive, setLastNavItemActive] = useState(false);

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

  return (
    <>
      <div className="top-header">
        <div className="container">
          <div className="lang_flex">
            <div className="prev">
              <i class="fa-solid fa-arrow-left-long"></i>
            </div>
            <div>
              <span>
                TR <i class="fa-solid fa-globe"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <header className="main-header">
        <div className="container">
          <div className={`header-flex ${menuActive ? "active" : ""}`}>
            <div className="header-logo">
              <a href="/">
                <img
                  src={require("../assets/images/logo.png")}
                  alt="Satılık Acenta Logo"
                />
              </a>
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
                  <a href="/">Anasayfa</a>
                </li>
                <li>
                  <a href="/">Hakkımızda</a>
                </li>
                <li>
                  <a href="/">Hizmetler</a>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/">Form</a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLastNavItem();
                    }}
                    className={lastNavItemActive ? "active" : ""}
                  >
                    İletişim
                  </a>
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
