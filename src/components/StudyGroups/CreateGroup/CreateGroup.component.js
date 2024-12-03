import React, { useEffect, useState } from "react";
import "./CreateGroup.scss";

import group from "../../../assets/images/group.png";

import VerticalLine from "../../../atoms/VerticalLine/VerticalLine";
import { getAppUrl, post, get } from "../../../utils/request.util";
import Searchbox from "../../../atoms/Searchbox/Searchbox";

function CreateGroup({ info, setPage }) {
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [groupImage, setGroupImage] = useState("");

  const [addedMembers, setAddedMembers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [fetchData, setFetchData] = useState(true);
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

  const cancelCreation = () => {
    window.location.href="select";
  };

  const creategroup = () => {
    const exam = localStorage.getItem("exam");
    const url = `${getAppUrl()}/group/`;
    post(
      url,
      {
        name: groupName,
        members: addedMembers,
        exam: exam,
        group_type: info.title,
        about: groupAbout,
        group_pic: groupImage,
      },
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        if (response.data.statusCode === 200) {
          const { group_id } = response.data.data;
          window.location.href = `session/${group_id}`;
        }
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

  function handleAddUserFromSearch(userId) {
    let updatedSet = [...globalData];

    const index = globalData.findIndex((e) => e.user_id === userId);
    const deletedReference = updatedSet.splice(index, 1);
    setGlobalData(updatedSet);

    let updatedMembers = addedMembers;
    updatedMembers.push(deletedReference[0]);
    setAddedMembers(updatedMembers);
  }

  function applyGroupImagePickerListeners() {
    const elem = document.getElementById("group-pic-input");
    elem.addEventListener("cancel", () => {
      console.log("Cancelled.");
    });
    elem.addEventListener("change", () => {
      if (elem.files.length == 1) {
        console.log("File selected: ", elem.files[0]);
        const FR = new FileReader();

        FR.addEventListener("load", function (evt) {
          setGroupImage(evt.target.result);
        });

        FR.readAsDataURL(elem.files[0]);
      }
    });
  }

  useEffect(() => {}, [friends, searchResult, globalData]);

  useEffect(() => {
    if (fetchData) {
      setGlobalSearchData();
      getFriends();
      setFetchData(false);
      applyGroupImagePickerListeners();
    }
  }, []);

  return (
    <div className="creategroup-layout">
      <div className="main-section">
        <div className="details-section flex-row">
          <div className="flex-column">
            <img src={groupImage.length ? groupImage : group} />
            <label className="m-8">
              <div>Upload group picture</div>
              <input
                id="group-pic-input"
                type="file"
                name="myImage"
                accept="image/*"
              />
            </label>
          </div>
          <div className="name-color-about flex-column">
            <input placeholder="Name" onChange={(e) => setGroupName(e.target.value)}/>
            <textarea
              className="inp"
              placeholder="About..."
              id="create-post-body"
              onChange={(e) => setGroupAbout(e.target.value)}
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
            {globalData.length ? (
              <Searchbox
                globalData={globalData}
                fetchFunction={setGlobalSearchData}
                onClickEvent={handleAddUserFromSearch}
              />
            ) : (
              <></>
            )}
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
