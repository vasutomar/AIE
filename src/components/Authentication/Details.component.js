import React from "react";
import "./Details.scss";
import logo from "../../assets/images/logo.png";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

function Details({ authenticationDetails, setPage }) {
  const { title, subtitle, buttonText, fields } = authenticationDetails;

  return (
    <div className="details">
      <div className="logo-column">
        <span class="material-icons" onClick={() => setPage("auth")}>
          arrow_back
        </span>
        <img src={logo} />
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
              />
            );
          })}
        </div>
        <Button
          text={buttonText}
          buttonType="py"
          onClick={() => {
            window.location.href = "/aie/questions";
          }}
        />
      </div>
    </div>
  );
}

export default Details;
