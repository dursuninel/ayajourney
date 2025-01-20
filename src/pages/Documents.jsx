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
  };

  const [docs, setDocs] = useState([]);
  const [pendingDocs, setPendingDocs] = useState(true);

  const [activeCat, setActiveCat] = useState(0);

  const { activeLanguage } = useLanguage();

  // ${user?.id || "-1"}
  useEffect(() => {
    setPendingDocs(true);
    axios.get(`/getDocs/2`).then((res) => {
      if (res.data.success === false) {
        Alert(
          "Başarısız",
          "Kullanıcı bilginiz alınamadı, Lüften hesabınıza tekrar giriş yapıp deneyiniz",
          "error"
        );
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
        <PageBanner title={"Belgelerim"} />
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
              Dosyalar yükleniyor. Lütfen bekleyiniz.
            </p>
          </div>
        </section>
      </>
    );

  return (
    <>
      <PageBanner
        title={user?.fullname ? `Hoşgeldin ${user?.fullname}` : "Belgelerim"}
      />
      <Toast ref={toast} position="bottom-center" />

      <section>
        <div className="container">
          <div className="file-upload-welcome-container">
            <Card title="Hoş Geldiniz!" className="welcome-card">
              <p className="welcome-text">
                Buradan işleminizi tamamlamak için gerekli olan dosyaları
                kolayca yükleyebilirsiniz. Lütfen doğru kategorideki dosyaları
                seçtiğinizden emin olun ve yükleme işlemini başlatın.
                Yüklediğiniz dosyalar, işleminizin hızlı ve doğru bir şekilde
                tamamlanmasına yardımcı olacaktır.
              </p>
              <p className="info-text">
                Dosya yüklerken dikkat etmeniz gereken herhangi bir kısıtlama
                veya format bilgisi varsa, aşağıda belirtilmiştir. Yardıma
                ihtiyaç duyarsanız, destek ekibimiz her zaman yanınızda.
              </p>
              <p className="file-types">
                Yükleyebileceğiniz dosya türleri şunlardır:
                <br />- <strong>PNG ve JPEG görselleri</strong> (.png, .jpeg,
                .jpg)
                <br />- <strong>WebP görselleri</strong> (.webp)
                <br />- <strong>PDF dosyaları</strong> (.pdf)
                <br />- <strong>Word Belgeleri</strong> (.doc)
              </p>
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
                    ( {Number(item.doc_limit) - Number(item.doc_count)} dosya
                    daha yüklenebilir ){" "}
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
                      <p>Yeni Belge Ekle</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal state={docModal} setState={setDocModal} title="Belge Yükle">
        <p className="text-center">Her seferinde tek bir belge yükleyiniz</p>
        <div>
          <div className="p-field">
            <label htmlFor="title">Belgeyi isimlendirin</label>
            <InputText
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Belge Adı"
            />
          </div>
          <div className="p-field mt-3">
            <FileInput setState={setFile} fileRef={fileRef} key={renderFile} />
          </div>
          <Button
            type="submit"
            label={sending ? "Kaydediliyor..." : "Kaydet"}
            className="mt-3 w-100"
            onClick={() => createDoc(activeCat)}
            disabled={sending}
          />
        </div>
      </Modal>
    </>
  );
}
