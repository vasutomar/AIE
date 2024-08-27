import React from "react";
import "./StudyGroups.scss";

import text from "../../assets/images/text.png";
import video from "../../assets/images/audio.png";
import events from "../../assets/images/video.png";
import audio from "../../assets/images/events.png";

import Card from "../../atoms/Card/Card";
import VerticalLine from "../../atoms/VerticalLine/VerticalLine";

function StudyGroups() {
  const cardData = [
    {
      title: "TEXT",
      content:
        "Join our text-only study group for focused, efficient learning and collaboration without distractions.",
      image: text,
    },
    {
      title: "AUDIO",
      content:
        "Join our audio study group for engaging, verbal discussions and collaborative learning through audio channels",
      image: audio,
    },
    {
      title: "VIDEO",
      content:
        "Join our video study group for interactive, face-to-face learning and collaboration in a dynamic environment.",
      image: video,
    },
    {
      title: "EVENTS",
      content:
        "Join our seminar video group for expert-led discussions and in-depth learning through interactive video sessions.",
      image: events,
    },
  ];

  const extraClasses = {
    cardClasses: "padding-1-1-2-1 min-height-200 cursor-pointer",
    titleClasses: "font-center",
  };

  return (
    <div className="studygroup-layout">
      <select>
        <option value={[]}>Search for a study group...</option>
      </select>
      <div className="card-bracket">
        {cardData.map((card_data, index) => {
          return (
            <>
              <div className="card-image-block">
                <Card
                  title={card_data.title}
                  body={card_data.content}
                  bgColor={{
                    title: "E2DCDE",
                    body: "E2DCDE",
                  }}
                  fontColor={"black"}
                  hideButtons
                  extraClasses={extraClasses}
                />
                <img src={card_data.image} />
              </div>
              {index < 3 && <VerticalLine height={300} />}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default StudyGroups;
