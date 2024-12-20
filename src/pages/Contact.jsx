import React from "react";

import PageBanner from "../components/PageBanner";
import ContactModule from "./Modules/Contact";

export default function Contact() {
  return (
    <>
      <PageBanner title={"İletişim"} />

      <ContactModule />
    </>
  );
}
