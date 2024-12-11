import React, { useState } from "react";
import Login from "./forms/Login";
import Register from "./forms/Register";

export default function AuthArea() {
  const [authType, setAuthType] = useState(0);

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
