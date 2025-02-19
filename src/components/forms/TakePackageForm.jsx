import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

const TakePackageForm = ({ toast, pacID }) => {
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      package_id: pacID,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("valid.name")).min(3, t("valid.nameLimit")),
      surname: Yup.string()
        .required(t("valid.surname"))
        .min(3, t("valid.surnameLimit")),
      email: Yup.string()
        .email(t("valid.trueEmail"))
        .required(t("valid.email")),
      phone: Yup.string().required(t("valid.phone")),
    }),
    onSubmit: (values, { resetForm }) => {
      setSending(true);
      axios
        .post("/addPackageForm", values)
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
      <p className="text-center">{t("text.packageText")}</p>

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
                placeholder={t("input.surname")}
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
              formik.touched.phone && formik.errors.phone ? "error-input" : ""
            }`}
          >
            <div>
              <input
                type="text"
                name="phone"
                placeholder={t("input.phone")}
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
          {sending ? t("input.sendPending") : t("input.send")}
        </button>
      </form>
    </>
  );
};

export default TakePackageForm;
