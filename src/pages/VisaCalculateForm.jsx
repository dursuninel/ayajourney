import React from "react";
import VisaCalculate from "../components/forms/VisaCalculate";
export default function VisaCalculateForm() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>Vize Alma İhitmalinizi Öğrenin</h1>
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
