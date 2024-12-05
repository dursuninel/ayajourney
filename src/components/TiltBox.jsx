import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false,
  max: 5,
  perspective: 1000,
  scale: 1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function TiltBox({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div options={defaultOptions}>{children}</div>
      ) : (
        <Tilt options={defaultOptions}>{children}</Tilt>
      )}
    </>
  );
}
