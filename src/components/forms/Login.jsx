import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçersiz email adresi")
      .required("Email zorunldur"),
    password: Yup.string().required("Şifre zorunludur"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email adresinizi giriniz"
              className={`p-inputtext-sm ${
                formik.touched.email && formik.errors.email ? "p-invalid" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="p-error">{formik.errors.email}</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="password">Şifre</label>
            <Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              feedback={false}
              toggleMask
              placeholder="Şifrenizi giriniz"
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
            label="Giriş Yap"
            icon="pi pi-sign-in"
            className="p-button-sm"
          />
        </form>
      </div>
    </>
  );
}
