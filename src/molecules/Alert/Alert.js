import React from "react";
import alertIcon from "../../assets/images/alert-girl.png";
import "./Alert.scss";

function Alert(alertProps) {
  const { title, primaryAction, secondaryAction } = alertProps;
  return (
    <div className="modal-main flex-row">
      <img src={alertIcon} />
      <div className="flex-column justify-content-spacearound">
        <div className="color-font-black">{title} Please try again</div>
        <div className="color-font-black">
          Did you forget your password?{" "}
          <a href="#" onClick={primaryAction}>
            Need help signing in
          </a>
        </div>
        <div className="color-font-black">
          You can still try again.{" "}
          <a href="#" onClick={secondaryAction}>
            I will try again
          </a>
        </div>
      </div>
    </div>
  );
}

export default Alert;
