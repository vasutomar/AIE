import React, { useState } from "react";
import "./YourGroups.scss";
import { getGroupImg, getGroupName } from "../../../utils/group.util";

function YourGroups({ groups, setPage }) {

  function startGroupCall() {
    setPage('group-call');
  }

  return (
    <div className="yourgroup-layout display-column align-items-center">
      <h1 className="font-36 font-weight-400 underline">YOUR GROUPS</h1>
      {groups.map((group, index) => {
        return (
          <div className="group-display-card flex-row" onClick={() => startGroupCall()}>
            <div className="nmt-section flex-column">
              <h3 className="font-20 font-weight-400">{index+1}. {group.name}</h3>
              <div className="members">
                {group.members.map((member) => {
                  return <img src={member.img} />;
                })}
              </div>
              <div className="type flex-row">
                <img src={getGroupImg(group.type)} />
                <label className="font-20 font-weight-400 underline">{getGroupName(group.type)} Group</label>
              </div>
            </div>
            <div className="about-section flex-column">
              <h3 className="font-20 font-weight-400 underline">About</h3>
              <p>{group.about}</p>
            </div>
          </div>
        );
      })}
      <div className="button-group">
        <button onClick={() => setPage('select-group')}>Create Group</button>
      </div>
    </div>
  );
}

export default YourGroups;
