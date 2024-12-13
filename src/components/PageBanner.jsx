import React from "react";

export default function PageBanner({ title }) {
  return (
    <>
      <section className="page_content">
        <div className="container">
          <div className="page_banner_content">
            <h1>{title}</h1>
          </div>
        </div>
      </section>
    </>
  );
}
