import React from "react";
import UsaStepForm from "../components/forms/UsaStepForm";
import { useTranslation } from "react-i18next";
export default function UsaForm() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.usa_banner")}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p
            className="page-description"
            dangerouslySetInnerHTML={{ __html: t("pageText.usa_text") }}
          />
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
