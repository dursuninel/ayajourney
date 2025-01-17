import React from "react";
import { FileUpload } from "primereact/fileupload";

export default function FileInput({ fileRef, setState }) {
  const customBase64Uploader = async (event) => {
    const file = event.files[0];
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onloadend = function () {
      const base64data = reader.result;
      console.log("Gönderilen dosya:", base64data); // Base64 veriyi kontrol et
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
        emptyTemplate={
          <p className="m-0">
            Veya yüklemek istediğiniz dosyayı buraya sürükleyip bırakın
          </p>
        }
        chooseLabel="Dosya Seç"
        uploadLabel="Dosyayı Onayla"
        cancelLabel="Sil"
        invalidFileSizeMessageDetail="(10MB)"
        invalidFileSizeMessageSummary="Seçilen dosyanın boyutu maximum limiti aşıyor"
        customUpload
        uploadHandler={customBase64Uploader}
        onRemove={removeFile}
      />
    </>
  );
}
