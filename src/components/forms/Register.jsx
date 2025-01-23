import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import Alert from "../Alert";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Register() {
  const { setAuthType } = useContext(UserContext);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    fullname: Yup.string().required(t("valid.fullname")),
    email: Yup.string().email(t("valid.trueEmail")).required(t("valid.email")),
    password: Yup.string()
      .min(6, t("valid.minPassword"))
      .required(t("valid.password")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("valid.passwordMatch"))
      .required(t("valid.passwordRepeat")),
  });

  const [sending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setSending(true);
        const response = await axios.post("/register", values);

        if (response.data.error === 0) {
          Alert(t("swal.error"), t("swal.emailUsing"), "error");
        } else {
          Alert(
            t("swal.successRegister"),
            t("swal.successRegisterMessage"),
            "success"
          );
          resetForm();
          setAuthType(0);
        }
      } catch (error) {
        Alert(t("swal.error"), t("swal.errorRegister"), "error");
      } finally {
        setSending(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-field">
          <label htmlFor="fullname">{t("input.fullname")}</label>
          <InputText
            id="fullname"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("input.fullname")}
            className={`p-inputtext-sm ${
              formik.touched.fullname && formik.errors.fullname
                ? "p-invalid"
                : ""
            }`}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <small className="p-error">{formik.errors.fullname}</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="email">{t("input.emailRegister")}</label>
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("input.emailRegister")}
            className={`p-inputtext-sm ${
              formik.touched.email && formik.errors.email ? "p-invalid" : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="p-error">{formik.errors.email}</small>
          )}
        </div>
        <div className="d-flex w-100 gap-3">
          <div className="p-field w-100">
            <label htmlFor="password">{t("input.password")}</label>
            <Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              feedback={false}
              toggleMask
              placeholder={t("input.password")}
              className={`p-inputtext-sm ${
                formik.touched.password && formik.errors.password
                  ? "p-invalid"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="p-error">{formik.errors.password}</small>
            )}
          </div>
          <div className="p-field w-100">
            <label htmlFor="confirmPassword">{t("input.passwordRepeat")}</label>
            <Password
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              feedback={false}
              toggleMask
              placeholder={t("input.passwordRepeat")}
              className={`p-inputtext-sm ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "p-invalid"
                  : ""
              }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <small className="p-error">
                  {formik.errors.confirmPassword}
                </small>
              )}
          </div>
        </div>
        <Button
          type="submit"
          label={sending ? t("input.registerPending") : t("input.register")}
          icon="pi pi-user-plus"
          className="p-button-sm"
        />
      </form>
    </div>
  );
}
