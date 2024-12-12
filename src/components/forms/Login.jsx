import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Alert from "../Alert";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function Login() {
  const [pending, setPending] = useState(false);

  const { saveUserWeb, setAuthMenu } = useContext(UserContext);

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
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      console.log("Form data:", values);
      try {
        setPending(true);

        const response = await axios.post("/webLogin", values);

        if (response.data.error === 0) {
          console.log(response.data.message);
          Alert(
            "Başarısız",
            `Bir hata oluştu, lütfen console'a bakınız`,
            "error"
          );
        } else if (response.data.error === 1) {
          Alert(
            "Başarısız",
            `Kullanıcı bulunamadı, girilen bilgileri kontrol ediniz`,
            "error",
            "Tamam",
            "Yeniden dene"
          );
        } else {
          Alert("Başarılı", `Hesabınıza başarıyla giris yaptınız`, "success");
          saveUserWeb(response.data);
          setAuthMenu(false);
        }
      } catch (error) {
        Alert(
          "Başarısız",
          `Bir hata oluştu, lütfen console'a bakınız`,
          "error",
          "Tamam",
          "Yeniden dene"
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
            label={pending ? "Giriş Yapılıyor..." : "Giriş Yap"}
            icon="pi pi-sign-in"
            className="p-button-sm"
          />
        </form>
      </div>
    </>
  );
}
