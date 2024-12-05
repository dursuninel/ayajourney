import React from "react";
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
  return <Tilt options={defaultOptions}>{children}</Tilt>;
}