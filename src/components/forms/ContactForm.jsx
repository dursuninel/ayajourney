import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const toast = useRef(null);
  const { t } = useTranslation();

  const [sending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profession: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("valid.name")).min(3, t("valid.nameLimit")),
      email: Yup.string()
        .email(t("valid.trueEmail"))
        .required(t("valid.email")),
      profession: Yup.string()
        .required(t("valid.profession"))
        .min(2, t("valid.professionLimit")),
      message: Yup.string()
        .required(t("valid.message"))
        .min(10, t("valid.messageLimit")),
    }),
    onSubmit: (values, { resetForm }) => {
      setSending(true);
      axios
        .post("/addContact", values)
        .then((res) => {
          if (res.data.insertId) {
            toast.current.show({
              severity: "success",
              summary: t("swal.success"),
              detail: t("swal.messageSuccess"),
              life: 2000,
            });
            resetForm();
          } else {
            toast.current.show({
              severity: "error",
              summary: t("swal.error"),
              detail: t("swal.errorMessage"),
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
                placeholder={t("input.name")}
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
                placeholder={t("input.email")}
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
                placeholder={t("input.profession")}
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
                placeholder={t("input.message")}
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
          {sending ? t("input.sendPending") : t("input.send")}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
