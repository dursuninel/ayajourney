import React, { useContext, useState } from "react";
import Login from "./forms/Login";
import Register from "./forms/Register";
import { UserContext } from "../context/UserContext";

export default function AuthArea() {
  const { authType, setAuthType } = useContext(UserContext);

  return (
    <>
      <div className="auth_choose">
        <div
          className={authType === 0 ? "active" : ""}
          onClick={() => setAuthType(0)}
        >
          Giriş Yap
        </div>
        <div
          className={authType === 1 ? "active" : ""}
          onClick={() => setAuthType(1)}
        >
          Kayıt Ol
        </div>
      </div>

      <div className="auth_area">
        {authType === 0 ? <Login /> : <Register />}
      </div>
    </>
  );
}
