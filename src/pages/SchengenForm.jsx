import React from "react";
import SchengenStepForm from "../components/forms/SchengenStepForm";

import TestForm from "../components/forms/TestForm";
export default function SchengenForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Schengen Vize Bilgi Formu</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            Schengen vize başvurularında istenen formu dikkatlice doldurunuz.{" "}
            <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <SchengenStepForm />
        </div>
      </section>
    </>
  );
}
