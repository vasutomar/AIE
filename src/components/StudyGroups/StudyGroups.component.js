import React, { useState } from "react";
import "./StudyGroups.scss";

import GroupLanding from "./GroupLanding/GroupLanding.component";
import CreateGroup from "./CreateGroup/CreateGroup.component";

import person1 from "../../assets/images/person1.png";
import person2 from "../../assets/images/person2.png";
import person3 from "../../assets/images/person3.png";

import text from "../../assets/images/text.png";
import video from "../../assets/images/audio.png";
import events from "../../assets/images/video.png";
import audio from "../../assets/images/events.png";

import YourGroups from "./YourGoups/YourGroups.component";
import GroupCall from "./GroupCall/GroupCall.component";

function StudyGroups() {
  const [page, setPage] = useState("your-groups");
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

  const userGroups = [
    {
      name: "Group1",
      members: [
        {
          name: "Amit",
          img: person1,
        },
        {
          name: "Samuel",
          img: person2,
        },
        {
          name: "Karan",
          img: person3,
        },
      ],
      type: "TEXT",
      about:" Our text-based study group is a collaborative online space where students can discuss, share resources, and support one another through written communication. Whether you're working through challenging assignments, need insights on complex topics, or just want to connect with like-minded peers, this group allows for detailed, thoughtful discussions that are easy to refer back to. Perfect for those who prefer a paced, organized exchange of ideas, our text-based group makes it easy to stay engaged, review key points, and revisit our collective knowledge at any time."
    },
    {
      name: "Group2",
      members: [
        {
          name: "Amit",
          img: person1,
        },
        {
          name: "Samuel",
          img: person2,
        },
        {
          name: "Karan",
          img: person3,
        },
      ],
      type: "VIDEO",
      about:
        "Our audio-based study group is a dynamic forum where students can engage in real-time discussions, explanations, and debates using voice chats. With a flexible schedule, this format lets you learn on the go, making it a great choice for auditory learners who absorb information best through listening and speaking. We encourage members to participate in study sessions, topic breakdowns, and Q&A sessions for a more personal and interactive study experience that brings concepts to life and fosters an immediate exchange of knowledge.",
    },
    {
      name: "Group3",
      members: [
        {
          name: "Amit",
          img: person1,
        },
        {
          name: "Samuel",
          img: person2,
        },
        {
          name: "Karan",
          img: person3,
        },
      ],
      type: "AUDIO",
      about:
        "Our video-based study group is an interactive space where students connect via video calls for a more visual and engaging study experience. Ideal for collaborative learning, our sessions include presentations, screen sharing, and visual demonstrations, allowing members to work through problems together, study for exams, or conduct in-depth discussions with face-to-face interaction. This format is perfect for learners who benefit from visual cues, real-time engagement, and a shared, immersive study environment. Join us to bring your studies to life with a community that’s as committed to growth and success as you are.",
    },
  ];

  function getGroupPageToShow() {
    switch (page) {
      case "your-groups": {
        return <YourGroups groups={userGroups} setPage={setPage} />;
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
