import React, { useEffect, useState } from "react";
import "./Discussions.scss";
import Card from "../../atoms/Card/Card";
import { getbgColorFromType, getFontColorFromType } from "../../utils/util";
import { getAppUrl, get, patch } from "../../utils/request.util";

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

  function onLike(identifier) {
    const like_count =
      data[data.findIndex((e) => e._id === identifier)].like_count + 1;
    patch(
      `${appUrl}/discussion/identifier`,
      {
        like_count,
        username,
      },
      headers,
      function () {
        const index = data.findIndex((post) => {
          return post._id === identifier;
        });
        const dataCopy = [...data];
        if (index >= 0) {
          dataCopy[index].isLiked = !dataCopy[index].isLiked;
        }
        setData(dataCopy);
      },
      function (error) {
        console.log("onlike error", error);
      }
    );
  }

  function onBookmark(identifier) {
    /* Write code to make API call to register bookmark */
    const index = data.findIndex((post) => {
      return post._id === identifier;
    });
    const dataCopy = [...data];
    if (index >= 0) {
      dataCopy[index].isBookmarked = !dataCopy[index].isBookmarked;
    }
    setData(dataCopy);
  }

  function toggleComments(id) {
    const post = document.getElementById(`${id}_post`);
    const commentSection = document.getElementById(`${id}_comment-section`);
    if (commentSection.style.display) {
      // Showing comment section
      post.style.borderRadius = "20px 20px 0 0";
      commentSection.style.removeProperty('display');
    } else {
      // Removing comment section
      post.style.borderRadius = "20px";
      commentSection.style.display = "none";
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
                  postId={cardData._id}
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
                  isLiked={cardData.isLiked}
                  isBookmarked={cardData.isBookmarked}
                  onLike={onLike}
                  onBookmark={onBookmark}
                  toggleComments={toggleComments}
                  allowCommentToggle={cardData.comments.length}
                />
                <div style={{"display": "none"}} className="comments" id={`${cardData._id}_comment-section`}>
                  {cardData.comments.map((comment) => {
                    return (
                      <div className={`comment color-font-white color-bg-79A3D3`}>{comment}</div>
                    )
                  })}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Discussions;
