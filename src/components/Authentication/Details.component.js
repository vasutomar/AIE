import React from "react";
import "./Details.scss";
import logo from "../../assets/images/logo.png";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { getAppUrl, post } from "../../utils/request.util";

function Details({ authenticationDetails, setPage, page }) {
  const { title, subtitle, buttonText, fields } = authenticationDetails;

  function handleAuthentication() {
    const inputs = document.getElementsByTagName('input');
    const payload = {};
    [...fields].forEach((field, index) => {
      payload[field.key] = inputs[index].value; 
    });
    post(`${getAppUrl()}/authentication/`+page, payload, null, (response) => {
      if (![200, 201].includes(response.data.statusCode)) {
        alert(`Server Error : ${response.data.error}`);
      } else {
        localStorage.setItem('token', response.data.data);
        window.location.href = "/aie/questions";
      }
    }, (error) => {
      alert(`API Error : ${error}`);
    });
  }

  return (
    <div className="details">
      <div className="logo-column">
        <span class="material-icons" onClick={() => setPage("auth")}>
          arrow_back
        </span>
        <img src={logo} alt="website-logo" />
      </div>
      <div className="info-column">
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
