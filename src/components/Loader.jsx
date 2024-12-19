import React from "react";

export default function Loader({ position }) {
  return (
    <div className="loader" style={{ position: position || "absolute" }}>
      <div className="spinner-border" role="status"></div>
    </div>
  );
}
