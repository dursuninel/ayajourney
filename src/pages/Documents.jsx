import React, { useContext, useEffect, useRef, useState } from "react";

import PageBanner from "../components/PageBanner";
import { useGlobal } from "../context/GlobalContext";
import DocItem from "../components/DocItem";
import Modal from "../components/Modal";
import FileInput from "../components/FileInput";
import { Button } from "primereact/button";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { UserContext } from "../context/UserContext";
import { Toast } from "primereact/toast";
import Alert from "../components/Alert";
import RandomNumber from "../components/RandomNumber";
import { useLanguage } from "../context/LanguageContext";
import { Card } from "primereact/card";
import UserNotFound from "../components/UserNotFound";
import { useTranslation } from "react-i18next";

export default function Documents() {
  const { wbContent } = useGlobal();
  const { user } = useContext(UserContext);

  const [docModal, setDocModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(false);
  const [sending, setSending] = useState(false);

  const fileRef = useRef();
  const [renderFile, setRenderFile] = useState("");
  const toast = useRef(null);

  const [renderDocs, setRenderDocs] = useState(false);

  const modalAction = (id) => {
    setActiveCat(id);
    setDocModal(true);
  };

  const createDoc = (cat_id) => {
    if (user?.id) {
      let requestData = {
        title,
        file,
        cat_id,
        user_id: user?.id || "0",
      };

      setSending(true);

      axios.post("/addDoc", requestData).then((res) => {
        setSending(false);
        if (res.data.insertId) {
          setDocModal(false);
          setTitle("");
          setRenderFile(res.data.insertId);
          toast.current.show({
            severity: "success",
            summary: "Başarılı",
            detail: "Belge Eklendi",
            life: 2000,
          });
          setRenderDocs(RandomNumber());
        } else {
          toast.current.show({
            severity: "error",
            summary: "Hata",
            detail: "Bir hata oluştu",
            life: 2000,
          });
        }
      });
    } else {
      UserNotFound();
    }
  };

  const [docs, setDocs] = useState([]);
  const [pendingDocs, setPendingDocs] = useState(true);

  const [activeCat, setActiveCat] = useState(0);

  const { activeLanguage } = useLanguage();
  const { t } = useTranslation();

  // ${user?.id || "-1"}
  useEffect(() => {
    setPendingDocs(true);
    axios.get(`/getDocs/${user?.id || "-1"}`).then((res) => {
      if (res.data.success === false) {
        UserNotFound();
        setPendingDocs(false);
      } else {
        setPendingDocs(false);
        console.log(res.data);
        setDocs(res.data);
      }
    });
  }, [renderDocs]);

  if (pendingDocs)
    return (
      <>
        <PageBanner title={t("pageText.docs")} />
        <Toast ref={toast} position="bottom-center" />

        <section>
          <div className="container">
            <div className="file-upload-welcome-container">
              <Card
                title={`${t("pageText.hi")} ${user?.fullname}!`}
                className="welcome-card"
              >
                <p className="welcome-text">{t("pageText.docsWelcome")}</p>
                <p className="info-text">{t("pageText.docsWelcome2")}</p>
                <p
                  className="file-types"
                  dangerouslySetInnerHTML={{
                    __html: t("pageText.docsWelcome3"),
                  }}
                />
              </Card>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                color: "#333",
                padding: "2rem 0",
              }}
            >
              {t("pageText.docLoading")}
            </p>
          </div>
        </section>
      </>
    );

  return (
    <>
      <PageBanner title={t("pageText.docs")} />
      <Toast ref={toast} position="bottom-center" />

      <section>
        <div className="container">
          <div className="file-upload-welcome-container">
            <Card
              title={`${t("pageText.hi")} ${user?.fullname}!`}
              className="welcome-card"
            >
              <p className="welcome-text">{t("pageText.docsWelcome")}</p>
              <p className="info-text">{t("pageText.docsWelcome2")}</p>
              <p
                className="file-types"
                dangerouslySetInnerHTML={{
                  __html: t("pageText.docsWelcome3"),
                }}
              />
            </Card>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="docs">
            {docs.map((item, key) => (
              <div className="docs-item" key={key}>
                <h2>
                  {activeLanguage.code === "en" ? item.en_title : item.title}{" "}
                  <small>
                    {" "}
                    ( {Number(item.doc_limit) - Number(item.doc_count)}{" "}
                    {t("pageText.docLimit")} ){" "}
                  </small>
                </h2>
                <div className="doc-flex">
                  {JSON.parse(item.docs).length > 0
                    ? JSON.parse(item.docs).map((doc, key) => (
                        <DocItem
                          key={key}
                          id={doc.doc_id}
                          title={doc.doc_title}
                          url={doc.doc_url}
                          user_id={2}
                          toast={toast}
                          setRenderDocs={setRenderDocs}
                        />
                      ))
                    : null}
                  {Number(item.doc_count) < Number(item.doc_limit) && (
                    <div
                      className="doc-item new"
                      onClick={() => modalAction(item.category_id)}
                    >
                      <div></div>
                      <p>{t("pageText.addDoc")}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal state={docModal} setState={setDocModal} title="Belge Yükle">
        <p className="text-center">{t("pageText.docInfo")}</p>
        <div>
          <div className="p-field">
            <label htmlFor="title">{t("pageText.docInfoTitle")}</label>
            <InputText
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("pageText.docInfoName")}
            />
          </div>
          <div className="p-field mt-3">
            <FileInput setState={setFile} fileRef={fileRef} key={renderFile} />
          </div>
          <Button
            type="submit"
            label={sending ? t("input.savePending") : t("input.save")}
            className="mt-3 w-100"
            onClick={() => createDoc(activeCat)}
            disabled={sending}
          />
        </div>
      </Modal>
    </>
  );
}
