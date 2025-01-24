import React from "react";

import PageBanner from "../components/PageBanner";
import ContactModule from "./Modules/Contact";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <PageBanner title={t("pageText.contact")} />

      <ContactModule />
    </>
  );
}
