import React from "react";
import VisaStepForm from "../components/forms/VisaStepForm";
export default function VisaForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Birleşik Krallık Vize Başvuru Formu</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            Birleşik Krallık vize başvurularında istenen formu dikkatlice
            doldurunuz. <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <VisaStepForm />
        </div>
      </section>
    </>
  );
}
