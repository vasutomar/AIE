import React from "react";
import "./Input.scss";
import { getClassFromType } from "../../utils/util";

function Input(inputProps) {
  const { specifier, type, placeholder } = inputProps;

  return (
    <input
      placeholder={placeholder}
      type={specifier}
      className={getClassFromType(type)}
    />
  );
}

export default Input;
