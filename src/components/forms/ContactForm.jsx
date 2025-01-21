import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Toast } from "primereact/toast";

const ContactForm = () => {
  const toast = useRef(null);

  const [sending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profession: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Adınızı girmek zorunludur.")
        .min(3, "Adınız en az 3 karakter olmalıdır."),
      email: Yup.string()
        .email("Geçerli bir email adresi girin.")
        .required("Email adresi zorunludur."),
      profession: Yup.string()
        .required("Mesleğinizi girmek zorunludur.")
        .min(2, "Meslek en az 2 karakter olmalıdır."),
      message: Yup.string()
        .required("Mesajınızı girmek zorunludur.")
        .min(10, "Mesajınız en az 10 karakter olmalıdır."),
    }),
    onSubmit: (values, { resetForm }) => {
      setSending(true);
      axios
        .post("/addContact", values)
        .then((res) => {
          if (res.data.insertId) {
            toast.current.show({
              severity: "success",
              summary: "Başarılı",
              detail: "Mesajınız gönderildi",
              life: 2000,
            });
            resetForm();
          } else {
            toast.current.show({
              severity: "error",
              summary: "Hata",
              detail: "Bir hata oluştu",
              life: 2000,
            });
          }
        })
        .finally(() => {
          setSending(false);
        });
    },
  });

  return (
    <>
      <Toast ref={toast} position="bottom-center" />

      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div>
          <div
            className={`input ${
              formik.touched.name && formik.errors.name ? "error-input" : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>

            {formik.touched.name && formik.errors.name && (
              <small className="p-error">{formik.errors.name}</small>
            )}
          </div>
        </div>
        <div>
          <div
            className={`input ${
              formik.touched.email && formik.errors.email ? "error-input" : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email Adresiniz"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>

            {formik.touched.email && formik.errors.email && (
              <small className="p-error">{formik.errors.email}</small>
            )}
          </div>
          <div
            className={`input ${
              formik.touched.profession && formik.errors.profession
                ? "error-input"
                : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="profession"
                placeholder="Meslek"
                value={formik.values.profession}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>
            {formik.touched.profession && formik.errors.profession && (
              <small className="p-error">{formik.errors.profession}</small>
            )}
          </div>
        </div>
        <div>
          <div
            className={`input ${
              formik.touched.message && formik.errors.message
                ? "error-input"
                : ""
            }`}
          >
            <div>
              <textarea
                name="message"
                placeholder="Mesajınız"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>
            {formik.touched.message && formik.errors.message && (
              <small className="p-error">{formik.errors.message}</small>
            )}
          </div>
        </div>
        <button className="btn-style" type="submit" disabled={sending}>
          {sending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
