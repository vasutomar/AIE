import React from "react";
import addMember from "../../../../assets/images/person_add_alt.png";
import personRemove from "../../../../assets/images/person_remove.png";
import mute from "../../../../assets/images/volume_off.png";

import "./TabView.scss";

import { getIcons } from "../../../../utils/group.util";

function MemberTabView({ groupType, members }) {
  const icons = {
    remove: personRemove,
    mute: mute,
  };

  return (
    <div className="member-tab-view">
      <div className="members-list flex-column">
        {members.map((member) => {
          return (
            <div className="flex-row m-8" key={member.name}>
              <img className="profile-pic" src={member.profile_pic} alt={member.name + "_icon"} />
              <div className="flex-column">
                <div>{member.name}</div>
                {member.isOnline ? (
                  <div className="flex-row align-items-center">
                    Online
                    <div className="green-circle" />
                  </div>
                ) : (
                  <div className="flex-row align-items-center">
                    Offline
                    <div className="red-circle" />
                  </div>
                )}
              </div>
              <div className="flex-row member-action-items">
                {getIcons(groupType).map((icon) => {
                  return <img key={icon} alt={`action-icon-${icon}`} src={icons[icon]} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-member-icon">
        <img src={addMember} alt="add-member-icon" />
      </div>
    </div>
  );
}

export default MemberTabView;
