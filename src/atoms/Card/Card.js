import React from "react";
import { getClassFromType } from "../../utils/util";
import "./Card.scss";

function Card(cardProps) {
  const { title, body, bgColor, fontColor } = cardProps;
  const titleBackground = bgColor?.title;
  const bodyBackground = bgColor?.body;
  const buttons = [
    { name: "thumb_up" },
    { name: "Comment" },
    { name: "Bookmark" },
  ];
  return (
    <div className={`custom-card color-bg-${bodyBackground}`}>
      <div
        className={`title-action-group color-bg-${bodyBackground} color-font-white`}
      >
        <div className={`title color-font-${fontColor} color-bg-${titleBackground}`}>{title}</div>
        <div className={`buttons color-font-${fontColor}`}>
          {buttons.map((button) => {
            return <span class="material-symbols-outlined">{button.name}</span>;
          })}
        </div>
      </div>
      <div className={`body color-font-${fontColor}`}>{body}</div>
      <span className={`material-symbols-outlined color-font-${fontColor}`}>keyboard_arrow_down</span>
    </div>
  );
}

export default Card;
