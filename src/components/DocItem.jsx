import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import RandomNumber from "../components/RandomNumber";
import UserNotFound from "./UserNotFound";
import { useTranslation } from "react-i18next";

export default function DocItem({
  id,
  title,
  url,
  user_id,
  toast,
  setRenderDocs,
}) {
  const { t } = useTranslation();

  const removeDocAct = (id, url) => {
    Swal.fire({
      title: t("swal.sure"),
      text: t("swal.sureText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("swal.confirmButtonText"),
      cancelButtonText: t("swal.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        if (user_id) {
          axios.post("/removeDocUser", { id, user_id, url }).then((res) => {
            if (res.data.message) {
              toast.current.show({
                severity: "success",
                summary: t("swal.success"),
                detail: t("swal.removeDocText"),
                life: 2000,
              });
              setRenderDocs(RandomNumber());
            } else {
              toast.current.show({
                severity: "error",
                summary: t("swal.error"),
                detail: t("swal.errorMessage"),
                life: 2000,
              });
            }
          });
        } else {
          UserNotFound();
        }
      }
    });
  };

  const downloadFile = (url, fileName) => {
    window.open(url, "_blank");
  };

  return (
    <div className="doc-item">
      <span onClick={() => removeDocAct(id, url)}>
        <i class="fa-solid fa-xmark"></i>
      </span>
      <div className="download-file" onClick={() => downloadFile(url, title)}>
        <i class="fa-solid fa-file-arrow-down"></i>{" "}
      </div>
      <p>{title}</p>
    </div>
  );
}
