import React, { useEffect, useState } from "react";
import "./Authentication.scss";
import Button from "../../atoms/Button/Button";
import logo from "../../assets/images/logo.png";
import apple from "../../assets/images/apple.png";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";
import Details from "./Details.component";

import { authDetails } from "../../utils/authentication.util";

function Authentication() {
  const [page, setPage] = useState("auth");
  const renderDetailsSection = (type) => {
    setPage(type);
  };

  useEffect(() => {
    /* Do Nothing */
  }, [page]);

  return (
    <>
      {page == "auth" ? (
        <div className="authentication">
          <img src={logo} alt="aie-logo" />
          <Button
            onClick={() => renderDetailsSection("login")}
            extraClass="m-8 w-12 h-4"
            buttonType={"pb"}
            text={"Login"}
          />
          <Button
            onClick={() => renderDetailsSection("signup")}
            extraClass="m-8 w-12 h-4"
            buttonType={"pb"}
            text={"Signup"}
          />
          <div className="social-tray">
            <img src={apple} alt="apple-authentication" />
            <img src={google} alt="google-authentication"/>
            <img src={facebook} alt="facebook-authentication"/>
          </div>
        </div>
      ) : (
        <Details setPage={setPage} authenticationDetails={authDetails[page]}/>
      )}
    </>
  );
}

export default Authentication;
