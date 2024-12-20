import React from "react";
import { NavLink } from "react-router-dom";

export default function yapim() {
  return (
    <div className="yapim">
      <h1>Henüz Yapım Aşamasında</h1>
      <NavLink to={"/"} className={"btn-style"}>
        Seçime Dön
      </NavLink>
    </div>
  );
}
