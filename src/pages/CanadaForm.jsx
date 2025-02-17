import React from "react";
import { useTranslation } from "react-i18next";
import CanadaStepForm from "../components/forms/CanadaStepForm";
export default function CanadaForm() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.canada_banner")}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p
            className="page-description"
            dangerouslySetInnerHTML={{ __html: t("pageText.canada_text") }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <CanadaStepForm />
        </div>
      </section>
    </>
  );
}
