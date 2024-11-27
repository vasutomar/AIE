import React from "react";
import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import "./Landing.scss";
import { get, post, getAppUrl } from "../../utils/request.util";

function Landing() {
  useEffect(() => {
    post(
      `${getAppUrl()}/authentication/verify`,
      {
        token: localStorage.getItem("token").split(" ")[1]
      },
      null,
      (response) => {
        if (response.data.message === "Invalid session") {
          localStorage.clear();
          window.location.href = "/aie/auth";
        } else {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            const isOnboardingComplete = localStorage.getItem(
              "isOnboardingComplete"
            );
            if (isOnboardingComplete === "false") {
              window.location.href = "/aie/questions";
            }
            window.location.href = "/aie/discussions";
          } else {
            window.location.href = "/aie/auth";
          }
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
