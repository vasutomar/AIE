import React, { useState } from "react";
import "./StudyGroups.scss";

import GroupLanding from "./GroupLanding/GroupLanding.component";
import CreateGroup from "./CreateGroup/CreateGroup.component";
import text from "../../assets/images/text.png";
import video from "../../assets/images/audio.png";
import events from "../../assets/images/video.png";
import audio from "../../assets/images/events.png";
function StudyGroups() {
  const [groupToCreate, setGroupToCreate] = useState("TEXT");
  const [showCreateScreen, setShowCreateScreen] = useState(false);
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
  return (
    <div className="studygroup-layout">
      {!showCreateScreen ? (
        <GroupLanding
          setGroupToCreate={setGroupToCreate}
          setShowCreateScreen={setShowCreateScreen}
          cardData={cardData}
        />
      ) : (
        <CreateGroup info={cardData.find(data => data.title === groupToCreate)}/>
      )}
    </div>
  );
}

export default StudyGroups;
