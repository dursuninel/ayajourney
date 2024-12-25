import React from "react";
import VisaCalculate from "../components/forms/VisaCalculate";
export default function VisaCalculateForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Vize Alma İhtimalinizi Öğrenin</h1>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="page-description">
            Riski en aza indirmek ve şansınızı arttırmak için AYA Journey
            dünyasına adım atabilirsiniz
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <VisaCalculate />
        </div>
      </section>
    </>
  );
}
