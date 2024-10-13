import React from "react";
import Button from "../../atoms/Button/Button";

function Post() {
  const typeOptions = ["Advice", "Doubt", "Celebrate", "Share"];

  return (
    <div className="create-post-container color-bg-C7DBE6">
      <div className="header flex-row">
        <select className="type-dropdown">
          {typeOptions.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
        <div className="toggle-pill">
          <label>Allow bookmark?</label>
          <input type="checkbox" id="bookmark-toggle" />
        </div>
        <div className="toggle-pill">
          <label>Allow comments?</label>
          <input type="checkbox" id="comment-toggle" />
        </div>
      </div>
      <div className="body flex-column">
        <input className="h-3 inp" placeholder="Title..." />
        <input className="h-20 inp" placeholder="Content..." />
      </div>
      <div className="footer flex-row justify-content-center">
        <Button
          onClick={() => {}}
          extraClass="m-8 w-12 h-3"
          buttonType={"primWhite"}
          text={"Create Post"}
        />
      </div>
    </div>
  );
}

export default Post;
