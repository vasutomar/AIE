import React, { useState } from "react";
import "./Details.scss";
import logo from "../../assets/images/logo.png";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { getAppUrl, post } from "../../utils/request.util";
import Alert from "../../molecules/Alert/Alert.js";

function Details({ authenticationDetails, setPage, page }) {
  const { title, subtitle, buttonText, fields } = authenticationDetails;
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  function handleAuthentication() {
    const inputs = document.getElementsByTagName("input");
    const payload = {};
    [...fields].forEach((field, index) => {
      payload[field.key] = inputs[index].value;
    });
    post(
      `${getAppUrl()}/authentication/` + page,
      payload,
      null,
      (response) => {
        const {
          statusCode,
          message,
          data
        } = response.data;
        if (statusCode === 200) {
          const {
            token,
            exam
          } = data;
          localStorage.setItem("token", `Bearer ${token}`);
          localStorage.setItem("username", payload["username"]);
          if (exam) {
            localStorage.setItem("exam", exam);
            window.location.href = "/aie/home";
          } else {
            window.location.href = "/aie/questions";
          }
        } else {
          setShowError(true);
          setErrorMessage(message);
        }
      },
      (error) => {
        setShowError(true);
        setErrorMessage(error);
      }
    );
  }

  return (
    <div className="details">
      {showError && (
        <Alert
          title={errorMessage}
          primaryAction={() => {}}
          secondaryAction={() => {
            setShowError(false);
          }}
        />
      )}
      <div className={`logo-column ${showError && "backdrop"}`}>
        <span className="material-icons" onClick={() => setPage("auth")}>
          arrow_back
        </span>
        <img src={logo} alt="website-logo" />
      </div>
      <div className={`info-column ${showError && "backdrop"}`}>
        <div className="headings">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="input-group">
          {fields.map((field) => {
            return (
              <Input
                placeholder={field.placeholder}
                specifier={field.specifier}
                type="inpGray"
                key={field.key}
                inputId={field.key}
              />
            );
          })}
        </div>
        <Button
          text={buttonText}
          buttonType="py"
          onClick={() => handleAuthentication()}
        />
      </div>
    </div>
  );
}

export default Details;
