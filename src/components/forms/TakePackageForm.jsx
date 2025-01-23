import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const TakePackageForm = ({ toast, pacID }) => {
  const [sending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      package: pacID,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Ad girmek zorunludur.")
        .min(3, "Adınız en az 3 karakter olmalıdır."),
      surname: Yup.string()
        .required("Soyad girmek zorunludur.")
        .min(3, "Soyadınız en az 3 karakter olmalıdır."),
      email: Yup.string()
        .email("Geçerli bir email adresi girin.")
        .required("Email adresi zorunludur."),
      phone: Yup.string().required("Telefon numarası girmek zorunludur."),
    }),
    onSubmit: (values, { resetForm }) => {
      setSending(true);
      axios
        .post("/addPackageForm", values)
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
      <p className="text-center">
        Uzman ekiplerimiz sizinle aşağıdaki bilgiler aracığıyle iletişime
        geçecek. Lütfen bilgilerinizi eksiksiz ve doğru bir şekilde doldurunuz.
      </p>

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
          <div
            className={`input ${
              formik.touched.surname && formik.errors.surname
                ? "error-input"
                : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="surname"
                placeholder="Soyadınız"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>
            {formik.touched.surname && formik.errors.surname && (
              <small className="p-error">{formik.errors.surname}</small>
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
              formik.touched.phone && formik.errors.phone ? "error-input" : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Telefon Numaranız"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="line" />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <small className="p-error">{formik.errors.phone}</small>
            )}
          </div>
        </div>

        <button
          className="btn-style w-100 mt-3"
          type="submit"
          disabled={sending}
        >
          {sending ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </>
  );
};

export default TakePackageForm;
