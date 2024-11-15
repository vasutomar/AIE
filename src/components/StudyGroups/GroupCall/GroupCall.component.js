import React, { useState } from "react";

import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import person3 from "../../../assets/images/person3.png";

import memberIcon from "../../../assets/images/member-tab.png";
import chatTab from "../../../assets/images/chat-tab.png";
import documentTab from "../../../assets/images/document-tab.png";
import uploadADocument from "../../../assets/images/upload-a-document.png";

import MemberTabView from "./TabViews/MemberTabView.component";
import ChatTabView from "./TabViews/ChatTabView.component";
import DocumentTabView from "./TabViews/DocumentTabView.component";

import "./GroupCall.scss";

function GroupCall({ type }) {
  const [currentTabView, setCurrentTabView] = useState("members");

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

  const chats = [{
    name: 'Vasu',
    comment: 'Comment 1'
  }];

  const documents = [{
    name: 'pdf1',
    source: 'google.com'
  }];

  function getTabView() {
    switch (currentTabView) {
      case "members":
        return <MemberTabView groupType={type} members={members} />;
      case "chat":
        return <ChatTabView chats={chats}/>;
      case "documents":
        return <DocumentTabView documents={documents}/>;
    }
  }

  function switchTab(tab) {
    setCurrentTabView(tab);
  }

  return (
    <div className="groupcall-layout">
      <div className="document-section">
        <img src={uploadADocument} />
        <div className="font-32">Upload a document</div>
      </div>
      <div className="right-panel">
        <div className="action-bar">
          {tabs.map((tabData) => {
            return (
              <div
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
    </div>
  );
}

export default GroupCall;
