import React,  { useEffect, useState }  from "react";

import memberIcon from "../../../assets/images/member-tab.png";
import chatTab from "../../../assets/images/chat-tab.png";
import documentTab from "../../../assets/images/document-tab.png";

import MemberTabView from "./TabViews/MemberTabView.component";
import ChatTabView from "./TabViews/ChatTabView.component";
import DocumentTabView from "./TabViews/DocumentTabView.component";

import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import person3 from "../../../assets/images/person3.png";

import './GroupCall.scss';

function TabBracket({ socket, type }) {
  const [currentTabView, setCurrentTabView] = useState("members");

  const members = [
    {
      img: person1,
      name: "Arun",
      isOnline: true,
    },
    {
      img: person2,
      name: "Smith",
      isOnline: true,
    },
    {
      img: person3,
      name: "Kiran",
      isOnline: true,
    },
  ];

  const documents = [
    {
      name: "pdf1",
      source: "google.com",
    },
  ];
  const tabs = [
    {
      img: memberIcon,
      tab: "members",
    },
    {
      img: chatTab,
      tab: "chat",
    },
    {
      img: documentTab,
      tab: "documents",
    },
  ];
  function switchTab(tab) {
    setCurrentTabView(tab);
  }
  function getTabView() {
    console.log('tabbracket : ', socket);
    switch (currentTabView) {
      case "members":
        return <MemberTabView groupType={type} members={members} />;
      case "chat":
        return <ChatTabView socket={socket} />;
      case "documents":
        return <DocumentTabView documents={documents} />;
    }
  }
  return (
    <div className="right-panel">
      <div className="action-bar">
        {tabs.map((tabData) => {
          return (
            <div
              key={tabData.tab}
              className={`action-icon-holder ${
                tabData.tab === currentTabView ? "active" : ""
              }`}
              onClick={() => switchTab(tabData.tab)}
            >
              <img src={tabData.img} alt={tabData.tab} />
            </div>
          );
        })}
      </div>
      {getTabView()}
    </div>
  );
}

export default TabBracket;
