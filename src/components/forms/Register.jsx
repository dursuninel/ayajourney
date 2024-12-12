import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import Alert from "../Alert";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const { setAuthType } = useContext(UserContext);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Ad soyad zorunludur"),
    email: Yup.string()
      .email("Geçersiz email adresi")
      .required("Email adresi zorunludur"),
    password: Yup.string()
      .min(6, "Şifreniz en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
      .required("Şifre tekrarı zorunludur"),
  });

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
        const response = await axios.post("/register", values);

        if (response.data.error === 0) {
          Alert("Başarısız", "Girilen email adresi kullanılmaktadır", "error");
        } else {
          Alert(
            "Kayıt Başarılı",
            "Kullanıcı bilgilerinizle giriş yapabilirsiniz",
            "success"
          );
          resetForm();
          setAuthType(0);
        }
      } catch (error) {
        Alert(
          "Başarısız",
          "Kayıt sırasında bir hata oluştu, tekrar deneyiniz",
          "error"
        );
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-field">
          <label htmlFor="fullname">Ad Soyad</label>
          <InputText
            id="fullname"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Adınız Soyadınız"
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
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email adresiniz"
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
            <label htmlFor="password">Şifre</label>
            <Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              feedback={false}
              toggleMask
              placeholder="Şifre"
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
            <label htmlFor="confirmPassword">Şifreyi Onayla</label>
            <Password
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              feedback={false}
              toggleMask
              placeholder="Şifreyi onayla"
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
          label="Kayıt Ol"
          icon="pi pi-user-plus"
          className="p-button-sm"
        />
      </form>
    </div>
  );
}
