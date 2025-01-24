import React from "react";

import PageBanner from "../components/PageBanner";
import { useGlobal } from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { wbContent } = useGlobal();
  const { t } = useTranslation();

  return (
    <>
      <PageBanner title={"Hakkımızda"} />

      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <img
                width={"100%"}
                src={require("../assets/images/about.png")}
                alt=""
              />
            </div>
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">{t("pageText.aboutTitle")}</span>
                <h2 className="module-title">
                  {
                    wbContent?.uniqWebText.find(
                      (item) => item.code_id === "who_we_title"
                    ).text
                  }
                </h2>
              </div>
              <div
                className="module-content"
                dangerouslySetInnerHTML={{
                  __html: wbContent?.uniqWebText.find(
                    (item) => item.code_id === "who_we_content"
                  ).text,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row align-items-center flex-md-row flex-column-reverse gap-md-0 gap-2">
            <div className="col-md-6 col-12">
              <div className="module-head">
                <span className="sm-title">{t("pageText.weWho")}</span>
                <h2 className="module-title">
                  {
                    wbContent?.uniqWebText.find(
                      (item) => item.code_id === "we_story_title"
                    ).text
                  }
                </h2>
              </div>
              <div
                className="module-content"
                dangerouslySetInnerHTML={{
                  __html: wbContent?.uniqWebText.find(
                    (item) => item.code_id === "we_story_content"
                  ).text,
                }}
              />
            </div>
            <div className="col-md-6 col-12">
              <img
                width={"100%"}
                src={require("../assets/images/fly.png")}
                alt="Fly"
                style={{ borderRadius: "1rem" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
