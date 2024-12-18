import React, { useState } from "react";

import PageBanner from "../components/PageBanner";
import TiltBox from "../components/TiltBox";
import { NavLink, useParams } from "react-router-dom";

export default function BlogDetail() {
  const { link } = useParams();

  return (
    <>
      <PageBanner title={"Blog Detay"} />

      <section>
        <div className="container">{link}</div>
      </section>
    </>
  );
}
