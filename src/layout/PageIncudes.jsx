import React from "react";
import Header from "./Header";

export default function PageIncudes({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
