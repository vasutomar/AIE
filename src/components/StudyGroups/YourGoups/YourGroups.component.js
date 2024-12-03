import React, { useEffect, useState } from "react";
import "./YourGroups.scss";
import { get, getAppUrl } from "../../../utils/request.util";
import { getGroupImg, getGroupName } from "../../../utils/group.util";
import groupImg from "../../../assets/images/group.png";

function YourGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    get(
      `${getAppUrl()}/group/`,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        const fetchedGroups = response.data.data;
        if (!fetchedGroups.length) {
          window.location.href = "groups/select";
        }
        setGroups(response.data.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  function startGroupCall(group_id) {
    window.location.href = `groups/session/${group_id}`;
  }

  return (
    <div className="yourgroup-layout display-column align-items-center">
      <h1 className="font-36 font-weight-400 underline">YOUR GROUPS</h1>
      <div className="group-cards">
      {groups.map((group, index) => {
        return (
          <div
            key={group.group_id}
            className="group-display-card flex-row"
            onClick={() => startGroupCall(group.group_id)}
          >
            <div className="nmt-section flex-column">
              <div className="flex-row">
                <img
                  src={group.group_pic.length ? group.group_pic : groupImg}
                />
                <div>
                  <h3 className="font-20 font-weight-400 underline">
                     {group.name}
                  </h3>
                  <div className="type flex-row">
                    <img src={getGroupImg(group.group_type)} />
                    <label className="font-weight-400">
                      {getGroupName(group.group_type)} Group
                    </label>
                  </div>
                </div>
              </div>
              <div className="members m-8">
                {group.members.map((member) => {
                  return <img  key={member.name} src={member.profile_pic} />;
                })}
              </div>
            </div>
            <div className="about-section flex-column">
              <h3 className="font-20 font-weight-400 underline">About</h3>
              <p>{group.about}</p>
            </div>
          </div>
        );
      })}
      </div>
      <div className="button-group">
        <button onClick={() => (window.location.href = "groups/select")}>
          Create Group
        </button>
      </div>
    </div>
  );
}

export default YourGroups;
