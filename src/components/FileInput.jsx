import React from "react";
import { FileUpload } from "primereact/fileupload";
import { useTranslation } from "react-i18next";

export default function FileInput({ fileRef, setState }) {
  const { t } = useTranslation();

  const customBase64Uploader = async (event) => {
    const file = event.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      const base64data = reader.result;
      setState(base64data);

      fileRef.current.clear();
      fileRef.current.setUploadedFiles([file]);
    };
  };

  const removeFile = () => {
    fileRef.current.clear();
    setState("");
  };

  return (
    <>
      <FileUpload
        name="file"
        ref={fileRef}
        accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        maxFileSize={10000000} // Maksimum dosya boyutu 10MB
        previewWidth={100}
        emptyTemplate={<p className="m-0">{t("file.drag")}</p>}
        chooseLabel={t("file.select")}
        uploadLabel={t("file.confirm")}
        cancelLabel={t("file.remove")}
        invalidFileSizeMessageDetail="(10MB)"
        invalidFileSizeMessageSummary={t("file.size")}
        customUpload
        uploadHandler={customBase64Uploader}
        onRemove={removeFile}
      />
    </>
  );
}
