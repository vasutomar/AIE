import React, { useEffect, useState } from "react";
import "./Discussions.scss";
import Card from "../../atoms/Card/Card";
import { getbgColorFromType, getFontColorFromType } from "../../utils/util";
import { getAppUrl, get, patch } from "../../utils/request.util";
import { getUserId } from "../../utils/authentication.util";

function Discussions() {
  const [data, setData] = useState();
  const appUrl = getAppUrl();
  const username = localStorage.getItem("username");
  const headers = {};
  headers.Authorization = localStorage.getItem("token");

  useEffect(() => {
    get(
      `${appUrl}/discussion/${localStorage.getItem("exam")}?page=1&items=20`,
      headers,
      (response) => {
        setData(response.data.data);
      },
      (error) => {
        /*Handle Error*/
      }
    );
  }, []);

  function onLike(id) {
    patch(
      `${appUrl}/discussion/like/${id}`,
      null,
      headers,
      function () {
        console.log("like toggled");
        window.location.reload();
        // TODO : Remove this and make dynamic changes to data
      },
      function (error) {
        console.log("on like toggle error", error);
      }
    );
  }

  function onBookmark(id) {
    patch(
      `${appUrl}/discussion/bookmark/${id}`,
      null,
      headers,
      function () {
        console.log("bookmark toggled");
        window.location.reload();
        // TODO : Remove this and make dynamic changes to data
      },
      function (error) {
        console.log("on bookmark toggle error", error);
      }
    );
  }

  function onAddComment(id) {
    const comment = document.getElementById(`${id}_new-comment`).value;
    patch(
      `${appUrl}/discussion/comment/${id}`,
      {
        comment,
      },
      headers,
      function () {
        console.log("comment added");
        toggleCommentBox(id);
        window.location.reload();
        // TODO : Remove this and make dynamic changes to data
      },
      function (error) {
        console.log("on comment error", error);
      }
    );
  }

  function toggleComments(id) {
    const post = document.getElementById(`${id}_post`);
    const commentSection = document.getElementById(`${id}_comment-section`);
    if (commentSection.style.display) {
      // Showing comment section
      post.style.borderRadius = "20px 20px 0 0";
      commentSection.style.removeProperty("display");
    } else {
      // Removing comment section
      post.style.borderRadius = "20px";
      commentSection.style.display = "none";
    }
  }

  function toggleCommentBox(id) {
    const post = document.getElementById(`${id}_post`);
    const commentBox = document.getElementById(`${id}_comment-box`);
    if (commentBox.style.display) {
      // Showing comment section
      post.style.borderRadius = "20px 20px 0 0";
      commentBox.style.removeProperty("display");
    } else {
      // Removing comment section
      post.style.borderRadius = "20px";
      commentBox.style.display = "none";
    }
  }

  useEffect(() => {
    /*Do Nothing*/
  }, [data]);

  return (
    <div className="discussion-layout">
      <div className="cards-container">
        {data &&
          data.map((cardData) => {
            return (
              <>
                <Card
                  postId={cardData.discussion_id}
                  title={[
                    cardData.username,
                    " ",
                    cardData.type || "Shares",
                    ": ",
                    cardData.title,
                  ].join("")}
                  body={cardData.body}
                  bgColor={getbgColorFromType(cardData.type || "Shares")}
                  fontColor={getFontColorFromType(cardData.type || "Shares")}
                  isLiked={cardData.liked_by.includes(getUserId())}
                  isBookmarked={cardData.bookmarked_by.includes(getUserId())}
                  onLike={onLike}
                  onBookmark={onBookmark}
                  toggleComments={toggleComments}
                  toggleCommentBox={toggleCommentBox}
                  allowCommentToggle={cardData.comments.length}
                />
                <div
                  style={{ display: "none" }}
                  className="comments"
                  id={`${cardData.discussion_id}_comment-section`}
                >
                  {cardData.comments.map((comment) => {
                    return (
                      <div
                        className={`comment color-font-white color-bg-79A3D3`}
                      >
                        {comment.username + " : " + comment.comment}
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{ display: "none" }}
                  className="comments"
                  id={`${cardData.discussion_id}_comment-box`}
                >
                  <div className={`comment color-font-white color-bg-79A3D3`}>
                    <input
                      className="comment-input color-font-white color-bg-79A3D3"
                      type="text"
                      id={`${cardData.discussion_id}_new-comment`}
                    ></input>
                    <button
                      className="comment-btn color-font-white color-bg-274C77"
                      onClick={() => onAddComment(cardData.discussion_id)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Discussions;
