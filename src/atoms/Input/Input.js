import React from "react";
import "./Input.scss";
import { getClassFromType } from "../../utils/util";

function Input(inputProps) {
  const { specifier, type, placeholder, inputId } = inputProps;

  return (
    <input
      placeholder={placeholder}
      type={specifier}
      className={getClassFromType(type)}
      id={inputId}
    />
  );
}

export default Input;
