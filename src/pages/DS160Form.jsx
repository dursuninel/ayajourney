import React from "react";
import SchengenStepForm from "../components/forms/SchengenStepForm";
import TestForm from "../components/forms/TestForm";
import DS160StepForm from "../components/forms/DS160StepForm";
export default function DS160Form() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>DS160 Vize Bilgi Formu</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="page-description">
            DS160 vize başvurularında istenen formu dikkatlice doldurunuz.{" "}
            <br />
            Lütfen bilgilerinizde Türkçe karakterler kullanmayınız.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <DS160StepForm />
        </div>
      </section>
    </>
  );
}
