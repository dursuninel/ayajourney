import React from "react";
import VisaCalculate from "../components/forms/VisaCalculate";
import { useTranslation } from "react-i18next";
export default function VisaCalculateForm() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.visa_calc_banner")}</h1>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="container">
          <div className="page-description">{t("pageText.visa_calc_text")}</div>
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
