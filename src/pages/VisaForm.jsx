import React from "react";
import UkStepForm from "../components/forms/UkStepForm";
import { useTranslation } from "react-i18next";
export default function VisaForm() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.uk_banner")}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p
            className="page-description"
            dangerouslySetInnerHTML={{ __html: t("pageText.uk_text") }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <UkStepForm />
        </div>
      </section>
    </>
  );
}
