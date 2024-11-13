import React from "react";

import like from "../../assets/images/like_empty.svg";
import liked from "../../assets/images/like_filled.svg";
import bookmark from "../../assets/images/bookmark_add.svg";
import bookmarked from "../../assets/images/bookmark_added.svg";

import "./Card.scss";

function Card(cardProps) {
  const {
    postId,
    title,
    body,
    bgColor,
    fontColor,
    hideButtons,
    extraClasses,
    isLiked,
    isBookmarked,
    onLike,
    onBookmark,
    toggleComments,
    allowCommentToggle,
    toggleCommentBox
  } = cardProps;
  const titleBackground = bgColor?.title;
  const bodyBackground = bgColor?.body;

  let cardClasses = "";
  let titleClasses = "";

  if (extraClasses) {
    cardClasses = extraClasses.cardClasses;
    titleClasses = extraClasses.titleClasses;
  }

  const getImgSrc = (name) => {
    if (name === buttons[0]) {
      return isLiked ? liked : like;
    } else {
      return isBookmarked ? bookmarked : bookmark;
    }
  };

  const getOperation = (name) => {
    if (name === buttons[0]) {
      return onLike;
    }
    return onBookmark;
  }

  const buttons = [
    { name: "thumb_up" },
    { name: "Comment" },
    { name: "Bookmark" },
  ];
  return (
    <div id={`${postId}_post`} className={`custom-card color-bg-${bodyBackground} ${cardClasses}`}>
      <div
        className={`title-action-group color-bg-${bodyBackground} color-font-white`}
      >
        <div
          className={`title color-font-${fontColor} color-bg-${titleBackground} ${titleClasses}`}
        >
          {title}
        </div>
        {!hideButtons && (
          <div className={`buttons color-font-${fontColor}`}>
            {buttons.map((button) => {
              return button === buttons[1] ? (
                <span key={button.name} className="material-symbols-outlined" onClick={() => toggleCommentBox(postId)}>{button.name}</span>
              ) : (
                <img key={button.name} alt={`button-${button.name}`} src={getImgSrc(button)} onClick={() => getOperation(button)(postId)}/>
              );
            })}
          </div>
        )}
      </div>
      <div className={`body color-font-${fontColor}`}>{body}</div>
      {!hideButtons && (
        <span className={`material-symbols-outlined color-font-${fontColor}`} onClick={() => allowCommentToggle && toggleComments(postId)}>
          keyboard_arrow_down
        </span>
      )}
    </div>
  );
}

export default Card;
