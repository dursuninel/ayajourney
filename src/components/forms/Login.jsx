import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Alert from "../Alert";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();

  const { saveUserWeb, setAuthMenu } = useContext(UserContext);

  const validationSchema = Yup.object({
    email: Yup.string().email(t("valid.trueEmail")).required(t("valid.email")),
    password: Yup.string().required(t("valid.password")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        setPending(true);

        const response = await axios.post("/webLogin", values);

        if (response.data.error === 0) {
          console.log(response.data.message);
          Alert(t("valid.error"), t("valid.consoleAlert"), "error");
        } else if (response.data.error === 1) {
          Alert(
            t("valid.success"),
            t("valid.notFoundUser"),
            "error",
            t("input.ok"),
            t("input.repeat")
          );
        } else {
          Alert(t("valid.success"), t("swal.okSuccess"), "success");
          saveUserWeb(response.data);
          setAuthMenu(false);
        }
      } catch (error) {
        Alert(
          t("valid.error"),
          t("valid.consoleAlert"),
          "error",
          t("input.ok"),
          t("input.repeat")
        );
        console.log("Error:", error);
      } finally {
        setPending(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-field">
            <label htmlFor="email">{t("input.email")}</label>
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("input.email")}
              className={`p-inputtext-sm ${
                formik.touched.email && formik.errors.email ? "p-invalid" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="p-error">{formik.errors.email}</small>
            )}
          </div>
          <div className="p-field">
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
          <Button
            type="submit"
            label={pending ? t("input.loginPending") : t("input.login")}
            icon="pi pi-sign-in"
            className="p-button-sm"
          />
        </form>
      </div>
    </>
  );
}
