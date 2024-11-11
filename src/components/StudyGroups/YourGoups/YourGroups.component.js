import React, { useState } from "react";
import "./YourGroups.scss";
import { getGroupImg, getGroupName } from "../../../utils/group.util";

function YourGroups({ groups, setPage }) {
  return (
    <div className="yourgroup-layout display-column align-items-center">
      <h1 className="underline">YOUR GROUPS</h1>
      {groups.map((group) => {
        return (
          <div className="group-display-card flex-row">
            <div className="nmt-section flex-column">
              <h3 className="underline">{group.name}</h3>
              <div className="members">
                {group.members.map((member) => {
                  return <img src={member.img} />;
                })}
              </div>
              <div className="type flex-row">
                <img src={getGroupImg(group.type)} />
                <label>{getGroupName(group.type)} Group</label>
              </div>
            </div>
            <div className="about-section flex-column">
              <h3 className="underline">About</h3>
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
