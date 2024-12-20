import React from "react";
import ContactForm from "../../components/forms/ContactForm";

export default function Contact() {
  return (
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
                src={require("../../assets/images/contact.png")}
                width={"100%"}
                alt="Contact"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
