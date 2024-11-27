import React, { useEffect, useState } from "react";
import "./CreateGroup.scss";

import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import person3 from "../../../assets/images/person3.png";
import person4 from "../../../assets/images/person4.png";
import person5 from "../../../assets/images/person5.png";
import person6 from "../../../assets/images/person6.png";
import person7 from "../../../assets/images/person7.png";
import person8 from "../../../assets/images/person8.png";

import group from "../../../assets/images/group.png";

import VerticalLine from "../../../atoms/VerticalLine/VerticalLine";
import { getAppUrl, post, get } from "../../../utils/request.util";
import Searchbox from "../../../atoms/Searchbox/Searchbox";

function CreateGroup({ info, setPage }) {
  const { image } = info;
  const colorOptions = [
    "A3CEF1",
    "274C77",
    "D8FCCF",
    "C7DBE6",
    "79A3D3",
    "F0D8E0",
  ];
  const [peerCount, setPeerCount] = useState(1);
  const [groupColor, setGroupColor] = useState(colorOptions[0]);
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");

  const [addedMembers, setAddedMembers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [fetchData, setFetchData] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [searchResult, setSearchResult] = useState([
    {
      name: "Cathy",
      user_id: "128fandsu129",
      profile_pic:
        "https://images.unsplash.com/photo-1660951381925-57ac7e40c40d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Adam",
      user_id: "128fandsu129",
      profile_pic:
        "https://images.unsplash.com/photo-1668092833465-457973cc21ac?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Karan",
      user_id: "128fandsu129",
      profile_pic:
        "https://images.unsplash.com/photo-1581019685017-5129b8105e37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Stacy",
      user_id: "128fandsu129",
      profile_pic:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const memberOptions = [1, 2, 3, 4, 5, 6];

  const cancelCreation = () => {
    setPage("select-group");
  };

  const creategroup = () => {
    const members = addedMembers.map((member) => {
      return {
        name: member.name,
        id: member.key,
      };
    });
    const exam = localStorage.getItem("exam");
    const url = `${getAppUrl()}/group/`;
    post(
      url,
      {
        name: groupName,
        color: groupColor,
        member_count: peerCount,
        members: members,
        exam: exam,
        group_type: info.title,
        about: groupAbout,
      },
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        /* Do Nothing */
      },
      (error) => {
        /* Handle Error */
      }
    );
  };

  function getFriends() {
    get(
      `${getAppUrl()}/profile/friends`,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        setFriends(response.data.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  function addMember(userId, type) {
    const dataSet = type == "friends" ? friends : searchResult;
    const updateFunc = type === "friends" ? setFriends : setSearchResult;
    let updatedSet = [...dataSet];

    const index = dataSet.findIndex((e) => e.user_id === userId);
    const deletedReference = updatedSet.splice(index, 1);
    updateFunc(updatedSet);

    let updatedMembers = addedMembers;
    updatedMembers.push(deletedReference[0]);
    setAddedMembers(updatedMembers);
  }

  function handleUserFilterInput(inputValue) {
    if (inputValue === "") {
      setFilteredResults([]);
    } else {
      let results = [...searchResult];
      results = results.filter((user) => {
        return user.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredResults(results);
    }
  }

  function setGlobalSearchData() {
    get(
      `${getAppUrl()}/profile/all/${localStorage.getItem("exam")}`,
      {
        Authorization: localStorage.getItem("token"),
      },
      function (response) {
        setGlobalData(response.data.data);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  useEffect(() => {}, [friends, searchResult, globalData]);

  useEffect(() => {
    if (fetchData) {
      setGlobalSearchData();
      getFriends();
      setFetchData(false);
    }
  }, []);

  return (
    <div className="creategroup-layout">
      <div className="main-section">
        <div className="details-section flex-row">
          <img src={group} />
          <div className="name-color-about flex-column">
            <div className="name-color flex-row">
              <input placeholder="Name" />
              <div className="color-picker-holder">
                <label>Color</label>
                <div className="bg-color-black" />
              </div>
            </div>
            <textarea
              className="inp"
              placeholder="About..."
              id="create-post-body"
            />
          </div>
        </div>
        <div className="members-section">
          <div className="list-section">
            <h2 className="underline">MEMBER LIST</h2>
            <div className="member-grid">
              {addedMembers.map((member) => {
                return (
                  <div key={member.user_id} className="member-status">
                    <img alt={"added-member-logo"} src={member.profile_pic} />
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="action-section">
          <button onClick={() => creategroup()}>Create</button>
          <button onClick={() => cancelCreation()}>Cancel</button>
        </div>
      </div>
      <VerticalLine height={"page"} />
      <div className="faq-section">
        <div className="add-section">
          <div className="add-box">
            <h2 className="underline">ADD MEMBERS</h2>
            {globalData.length ? <Searchbox globalData={globalData} fetchFunction={setGlobalSearchData} /> : <></>}
          </div>
          <div className="friends-box flex-column">
            <h2 className="underline">PICK FROM FRIENDS</h2>
            <div className="friends">
              {friends.map((friend, index) => {
                return (
                  <div
                    key={friend.user_id}
                    className="flex-row friend-holder"
                    onClick={() => addMember(friend.user_id, "friends")}
                  >
                    <img alt={"friend-logo"} src={friend.profile_pic} />
                    <div>{friend.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
