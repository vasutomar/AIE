import React, { useState } from "react";
import "./StudyGroups.scss";

import GroupLanding from "./GroupLanding/GroupLanding.component";
import CreateGroup from "./CreateGroup/CreateGroup.component";

import text from "../../assets/images/text.png";
import video from "../../assets/images/audio.png";
import events from "../../assets/images/video.png";
import audio from "../../assets/images/events.png";

import YourGroups from "./YourGoups/YourGroups.component";
import GroupCall from "./GroupCall/GroupCall.component";

function StudyGroups({
  pageToRender
}) {
  const [page, setPage] = useState(pageToRender);
  const [groupToCreate, setGroupToCreate] = useState("TEXT");
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

  function getGroupPageToShow() {
    switch (page) {
      case "your-groups": {
        return <YourGroups setPage={setPage} />;
      }
      case "create-group": {
        return (
          <CreateGroup
            setPage={setPage}
            info={cardData.find((data) => data.title === groupToCreate)}
          />
        );
      }
      case "select-group": {
        return (
          <GroupLanding
            setGroupToCreate={setGroupToCreate}
            setPage={setPage}
            cardData={cardData}
          />
        );
      }
      case "group-call": {
        return (
          <GroupCall type={groupToCreate}/>
        );
      }
    }
  }

  return <div className="studygroup-layout">{getGroupPageToShow()}</div>;
}

export default StudyGroups;
