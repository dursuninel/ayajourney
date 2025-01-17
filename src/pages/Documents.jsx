import React, { useContext, useRef, useState } from "react";

import PageBanner from "../components/PageBanner";
import { useGlobal } from "../context/GlobalContext";
import DocItem from "../components/DocItem";
import Modal from "../components/Modal";
import FileInput from "../components/FileInput";
import { Button } from "primereact/button";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { UserContext } from "../context/UserContext";

export default function Documents() {
  const { wbContent } = useGlobal();
  const { user } = useContext(UserContext);

  const [docModal, setDocModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(false);
  const [sending, setSending] = useState(false);

  const fileRef = useRef();

  const createDoc = (cat_id, user_id) => {
    let requestData = {
      title,
      file,
      cat_id,
      user_id: user?.id || "0",
    };

    setSending(true);

    axios.post("/addDoc", requestData).then((res) => {
      setSending(false);
      console.log("Yükleme Başarılı", res);
    });
  };

  return (
    <>
      <PageBanner title={"Belgelerim"} />

      <section>
        <div className="container">
          <div className="docs">
            <div className="docs-item">
              <h2>Bilgi</h2>
              <div className="doc-flex">
                <DocItem title={"Belge Adı"} />
                <div className="doc-item new" onClick={() => setDocModal(true)}>
                  <div></div>
                  <p>Yeni Belge Ekle</p>
                </div>
              </div>
            </div>
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
            <FileInput setState={setFile} fileRef={fileRef} />
          </div>
          <Button
            type="submit"
            label={sending ? "Kaydediliyor..." : "Kaydet"}
            className="mt-3 w-100"
            onClick={() => createDoc(1, 1)}
            disabled={sending}
          />
        </div>
      </Modal>
    </>
  );
}
