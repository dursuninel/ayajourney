import React from "react";
import VisaForms from "../components/forms/VisaForm";
export default function VisaForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Aya Journey İngiltere Vize Bilgi Fişi</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            İngiltere vize başvurularında istenen formu dikkatlice doldurunuz.{" "}
            <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <VisaForms />
        </div>
      </section>
    </>
  );
}
