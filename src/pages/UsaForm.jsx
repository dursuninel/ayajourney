import React from "react";
import SchengenStepForm from "../components/forms/SchengenStepForm";
import TestForm from "../components/forms/TestForm";
import UsaStepForm from "../components/forms/UsaStepForm";
export default function UsaForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>USA Vize Bilgi Formu</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            USA vize başvurularında istenen formu dikkatlice doldurunuz.{" "}
            <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <UsaStepForm />
        </div>
      </section>
    </>
  );
}
