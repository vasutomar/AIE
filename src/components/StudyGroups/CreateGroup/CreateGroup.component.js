import React from "react";
import "./CreateGroup.scss";

import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import person3 from "../../../assets/images/person3.png";
import person4 from "../../../assets/images/person4.png";
import person5 from "../../../assets/images/person5.png";
import person6 from "../../../assets/images/person6.png";
import person7 from "../../../assets/images/person7.png";
import person8 from "../../../assets/images/person8.png";

function CreateGroup({ info }) {
  const image = info.image;
  const searchResult = [
    {
      name: "Rahul",
      key: "128fandsu129",
    },
    {
      name: "Samantha",
      key: "128fandsu139",
    },
    {
      name: "Sam",
      key: "128fandsu179",
    },
  ];

  const addedMembers = [
    {
      name: "Rahul",
      key: "128fandsu129",
      img: person1,
    },
    {
      name: "Samantha",
      key: "128fandsu139",
      img: person2,
    },
    {
      name: "Sam",
      key: "128fandsu179",
      img: person3,
    },
  ];

  const friends = [
    {
      name: "Martha",
      key: "128fandsu129",
      img: person4,
    },
    {
      name: "Adam",
      key: "128fandsu139",
      img: person5,
    },
    {
      name: "Eve",
      key: "128fandsu179",
      img: person6,
    },
  ];

  const memberOptions = [1, 2, 3, 4, 5, 6];

  const colorOptions = [
    "A3CEF1",
    "274C77",
    "D8FCCF",
    "C7DBE6",
    "79A3D3",
    "F0D8E0",
  ];

  return (
    <div className="creategroup-layout">
      <div className="main-section">
        <div className="details-section">
          <div className="details-card">
            <h2>ENTER GROUP DETAILS</h2>
            <div className="flex-row detail">
              <label>Name</label>
              <input className="nameInput"></input>
            </div>
            <div className="flex-row detail">
              <label>Peer Count</label>
              <div className="flex-row member-count-holder">
                {memberOptions.map((count) => {
                  return <div className="number">{count}</div>;
                })}
              </div>
            </div>
            <div className="flex-row detail">
              <label>Color</label>
              <div className="flex-row member-count-holder">
                {colorOptions.map((color) => {
                  return <div className={`color-bg-${color} color`} />;
                })}
              </div>
            </div>
          </div>
          <img src={image} />
        </div>
        <div className="members-section">
          <div className="add-section">
            <div className="add-box">
              <h2>ADD MEMBERS</h2>
              <select id={"memberSearch"}>
                <option value="" disabled selected>
                  Select your option
                </option>
                {searchResult.map((option) => {
                  return (
                    <option key={option.key} value={option.name}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="friends-box">
              <h2>PICK FROM FRIENDS</h2>
              <div className="friends">
                {friends.map((friend) => {
                  return (
                    <div className="flex-row friend-holder">
                      <img src={friend.img} />
                      <div>{friend.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="list-section">
            <h2>MEMBER LIST</h2>
            {addedMembers.map((member) => {
              return (
                <div className="member-status">
                  <img src={member.img} />
                  <div>{member.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="faq-section">
        <h1>{info.title} GROUP</h1>
        <h3>FAQ</h3>
      </div>
    </div>
  );
}

export default CreateGroup;
