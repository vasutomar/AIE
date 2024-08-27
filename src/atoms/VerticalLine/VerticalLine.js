import React from "react";
import "./VerticalLine.scss";

function VerticalLine(inputProps) {
  const { height } = inputProps;

  return <div class={`vl-${height}`}></div>;
}

export default VerticalLine;
