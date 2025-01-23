import React, { useContext, useState } from "react";
import Login from "./forms/Login";
import Register from "./forms/Register";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

export default function AuthArea() {
  const { authType, setAuthType } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="auth_choose">
        <div
          className={authType === 0 ? "active" : ""}
          onClick={() => setAuthType(0)}
        >
          {t("input.login")}
        </div>
        <div
          className={authType === 1 ? "active" : ""}
          onClick={() => setAuthType(1)}
        >
          {t("input.register")}
        </div>
      </div>

      <div className="auth_area">
        {authType === 0 ? <Login /> : <Register />}
      </div>
    </>
  );
}
