import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import RandomNumber from "../components/RandomNumber";

export default function DocItem({
  id,
  title,
  url,
  user_id,
  toast,
  setRenderDocs,
}) {
  const removeDocAct = (id, url) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu belgeyi silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/removeDocUser", { id, user_id, url }).then((res) => {
          if (res.data.message) {
            toast.current.show({
              severity: "success",
              summary: "Başarılı",
              detail: "Dosya silindi",
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
      }
    });
  };
  return (
    <div className="doc-item">
      <span onClick={() => removeDocAct(id, url)}>
        <i class="fa-solid fa-xmark"></i>
      </span>
      <div>
        <i class="fa-solid fa-file-arrow-down"></i>{" "}
      </div>
      <p>{title}</p>
    </div>
  );
}
