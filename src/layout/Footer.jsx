import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="clipped-container">
          <img
            src={require("../assets/images/path.png")}
            className="clipped"
            alt=""
          />
          <img src={require("../assets/images/logo.png")} alt="" />
        </div>
        <div className="footer-content">
          <div className="container">
            <ul className="navigation-list">
              <li>
                <NavLink to={"/visa"}>Anasayfa</NavLink>
              </li>
              <li>
                <NavLink to={"/visa/about"}>Hakkımızda</NavLink>
              </li>
              <li>
                <NavLink to={"/visa/services"}>Hizmetler</NavLink>
              </li>
              <li>
                <NavLink to={"/visa/blog"}>Blog</NavLink>
              </li>
              <li>
                <NavLink to={"/visa/form"}>Form</NavLink>
              </li>
              <li>
                <NavLink to={"/visa/contact"}>İletişim</NavLink>
              </li>
            </ul>

            <div className="footer-cards">
              <div>
                <span>Ankara Paragon Tower</span>
                <p>
                  Kızılırmak, Çukurambar, Ufuk Ünv. Cd No:3, 06510
                  Çankaya/Ankara
                </p>
                <a href="tel:903122586362">
                  <i className="fa-solid fa-phone"></i> +90 (312) 258 63 62
                </a>
              </div>
              <div>
                <span>İstanbul Sun Plaza</span>
                <p>Maslak, Bilim Sk. No:5, 34398 Sarıyer/İstanbul</p>
                <a href="tel:902123675807">
                  <i className="fa-solid fa-phone"></i> +90 (212) 367 58 07
                </a>
              </div>
            </div>

            <div className="footer-social">
              <a href="mailto:vizedestek@ayajourneys.com">
                <i className="fa-solid fa-envelope"></i> vizedestek@ayajourneys.com
              </a>
              <ul className="social-list">
                <li>
                  <a href="/">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
            <br />

            <hr style={{ color: "#fff", opacity: 1 }} />
            <p className="copyright">
              © {new Date().getFullYear()} Aya Journey, Tüm Hakları Saklıdır.
            </p>
            <br />
          </div>
        </div>
      </footer>
    </>
  );
}
