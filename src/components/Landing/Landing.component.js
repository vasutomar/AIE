import React from "react";
import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import "./Landing.scss";
import { get, getAppUrl } from "../../utils/request.util";

function Landing() {
  useEffect(() => {
    get(
      `${getAppUrl()}/authentication/health`,
      null,
      (response) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const isOnboardingComplete = localStorage.getItem(
            "isOnboardingComplete"
          );
          if (isOnboardingComplete === "false") {
            window.location.href = "/aie/questions";
          }
          window.location.href = "/aie/home";
        } else {
          window.location.href = "/aie/auth";
        }
      },
      (error) => {
        /*Handle Error*/
      }
    );
  }, []);

  return <img src={logo} alt="aie-logo" />;
}

export default Landing;
