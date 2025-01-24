import React from "react";
import SchengenStepForm from "../components/forms/SchengenStepForm";
import { useTranslation } from "react-i18next";

export default function SchengenForm() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{t("pageText.schengen_banner")}</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p
            className="page-description"
            dangerouslySetInnerHTML={{ __html: t("pageText.schengen_text") }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <SchengenStepForm />

          {/* <h2
            style={{
              backgroundColor: "var(--blue)",
              color: "white",
              textAlign: "center",
              padding: "4rem 1rem",
            }}
          >
            Yapım aşamasında
          </h2> */}
        </div>
      </section>
    </>
  );
}
