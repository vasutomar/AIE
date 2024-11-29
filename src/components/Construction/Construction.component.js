import React from "react";
import { useParams } from "react-router-dom";
import construction from "../../assets/images/construction.png";
import "./Construction.scss";

function Construction() {
  const { feature } = useParams();
  return (
    <div className="construction-layout">
      <img src={construction} />
      <div>{feature} is under construction</div>
      <div>We will notify you when this feature is released!</div>
      <div>For more info contact us</div>
      <div>
        email us at <a href="#">customer-care@aie.com</a>
      </div>
    </div>
  );
}

export default Construction;
