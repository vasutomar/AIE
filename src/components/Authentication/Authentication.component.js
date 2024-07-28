import React from "react";
import './Authentication.scss';
import Button from "../../atoms/Button/Button";
import logo from "../../assets/images/logo.png";
import apple from "../../assets/images/apple.png";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";

function Authentication() {
  return (
    <div className="authentication">
      <img src={logo} />
      <Button extraClass="m-8" buttonType={"pb"} text={"Login"} />
      <Button extraClass="m-8" buttonType={"pb"} text={"Signup"} />
      <div className="social-tray">
        <img src={apple} />
        <img src={google} />
        <img src={facebook} />
      </div>
    </div>
  );
}

export default Authentication;
