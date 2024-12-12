import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
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
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      // Burada form verilerini işleyebilirsiniz
    },
  });

  return (
    <form className="contact-form" onSubmit={formik.handleSubmit}>
      <div>
        <div
          className={`input ${
            formik.touched.name && formik.errors.name ? "error-input" : ""
          }`}
        >
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
      </div>
      <div>
        <div
          className={`input ${
            formik.touched.email && formik.errors.email ? "error-input" : ""
          }`}
        >
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
        <div
          className={`input ${
            formik.touched.profession && formik.errors.profession
              ? "error-input"
              : ""
          }`}
        >
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
      </div>
      <div>
        <div
          className={`input ${
            formik.touched.message && formik.errors.message ? "error-input" : ""
          }`}
        >
          <textarea
            name="message"
            placeholder="Mesajınız"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="line" />
        </div>
      </div>
      <button className="btn-style" type="submit">
        Gönder
      </button>
    </form>
  );
};

export default ContactForm;
