import React, { useEffect, useState } from "react";
import "./Discussions.scss";
import Card from "../../atoms/Card/Card";
import { getbgColorFromType, getFontColorFromType } from "../../utils/util";
import { getAppUrl, get } from "../../utils/request.util";

function Discussions() {
  const [data, setData] = useState();

  useEffect(() => {
    get(
      `${getAppUrl()}/discussion/${localStorage.getItem('exam')}`,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        setData(response.data.data);
      },
      (error) => {
        /*Handle Error*/
      }
    );
  }, []);
  
  function onLike(identifier) {
    /* Write code to make API call to register like */
    const index = data.findIndex((post) => { return post.id === identifier });
    const dataCopy = [...data];
    if (index >= 0) {
      dataCopy[index].isLiked = !dataCopy[index].isLiked;
    }
    setData(dataCopy);
  }

  function onBookmark(identifier) {
    /* Write code to make API call to register bookmark */
    const index = data.findIndex((post) => { return post.id === identifier });
    const dataCopy = [...data];
    if (index >= 0) {
      dataCopy[index].isBookmarked = !dataCopy[index].isBookmarked;
    }
    setData(dataCopy);
  }

  function fetchComments(index) {
    /* Write code to make API call to fetch comments */
    
  }

  useEffect(() => {
    /*Do Nothing*/
  }, [data]);

  return (
    <div className="discussion-layout">
      <div className="cards-container">
      {data && data.map((cardData) => {
        return <Card
          postId={cardData._id}
          title={[cardData.username,' ',cardData.type || 'Shares',': ',cardData.title].join('')}
          body={cardData.body}
          bgColor={getbgColorFromType(cardData.type || 'Shares')}
          fontColor={getFontColorFromType(cardData.type || 'Shares')}
          isLiked={cardData.isLiked}
          isBookmarked={cardData.isBookmarked}
          onLike={onLike}
          onBookmark={onBookmark}
          fetchComments={fetchComments}
        />
      })}
      </div>
    </div>
  );
}

export default Discussions;
