import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import uploadADocument from "../../../assets/images/upload-a-document.png";

import "./GroupCall.scss";
import TabBracket from "./TabBracket.component";
import { get, getAppUrl } from "../../../utils/request.util";

function GroupCall({ type }) {
  const { groupId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState();
  const [groupData, setGroupData] = useState({});

  function establishConnection() {
    const token = localStorage.getItem("token").split(" ")[1];
    setSocket(new WebSocket(`ws://localhost:3003/${groupId}`, token));
  }

  function fetchGroupData() {
    get(
      `${getAppUrl()}/group/${groupId}`,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        setGroupData(response.data.data);
        establishConnection();
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  useEffect(() => {
    fetchGroupData();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsLoading(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };
  }, [socket]);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="groupcall-layout">
      <div className="document-section">
        <img src={uploadADocument} />
        <div className="font-32">Upload a document</div>
      </div>
      <TabBracket groupData={groupData} socket={socket} type={type} />
    </div>
  );
}

export default GroupCall;
