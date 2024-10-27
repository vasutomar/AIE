import React from "react";
import Button from "../../atoms/Button/Button";
import { post, getAppUrl } from "../../utils/request.util";

function Post({ closeModal }) {
  const typeOptions = ["Advice", "Doubt", "Celebrate", "Share"];

  const createPost = () => {
    const exam = localStorage.getItem("exam");
    const username = localStorage.getItem("username");
    const title = document.getElementById("create-post-title").value;
    const body = document.getElementById("create-post-body").value;

    const payload = {
      exam,
      title,
      body,
      username,
      like_count: 0,
      bookmark_count: 0,
      comments: [],
      liked_by: [],
      bookmarked_by: []
    };
    post(
      `${getAppUrl()}/discussion/`,
      payload,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        /*Do Nothing*/
        console.log("create post response", response);
        window.location.reload();
        closeModal();
      },
      (error) => {
        /*Handle Error*/
        console.log(error);
      }
    );
  };

  return (
    <div className="create-post-container color-bg-C7DBE6">
      <div className="header flex-row">
        <select className="type-dropdown">
          {typeOptions.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
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
        <div className="cross-button">
          <span class="material-symbols-outlined" onClick={closeModal}>close</span>
        </div>
      </div>
      <div className="body flex-column">
        <input
          className="h-3 inp"
          placeholder="Title..."
          id="create-post-title"
        />
        <textarea
          className="h-20 inp"
          placeholder="Content..."
          id="create-post-body"
        />
      </div>
      <div className="footer flex-row justify-content-center">
        <Button
          onClick={() => createPost()}
          extraClass="m-8 w-12 h-3"
          buttonType={"primWhite"}
          text={"Create Post"}
        />
      </div>
    </div>
  );
}

export default Post;
