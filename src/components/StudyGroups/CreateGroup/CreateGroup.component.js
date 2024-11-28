import React, { useEffect, useState } from "react";
import "./CreateGroup.scss";

import group from "../../../assets/images/group.png";

import VerticalLine from "../../../atoms/VerticalLine/VerticalLine";
import { getAppUrl, post, get } from "../../../utils/request.util";
import Searchbox from "../../../atoms/Searchbox/Searchbox";

function CreateGroup({ info, setPage }) {
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [groupImage, setGroupImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzs3XecXFX5P/DPc2d2N42EEFCQ3quiNFFqQERK6mYnPaSRUAwKiASIcEW6AgpIiambbMms2ZqCIgR/XwTFAgqo2OhFeupmd+fe5/fHJppgSLbMzHPPnc/79bovEZJ7PzOzO+e555x7DkBEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREFBNiHYCIiHJAIV9v/PoebV5yXwnDfUPInuLpAISShEg/QItE0Mc6piVVrAOkDaqr4WkG8N4D9A1AXi0KM6/cN/i+tyBQ65y5wgKAiMhx/io/+faa9z+rIscDcoICxwtwGIBi62yOawXkL4Lwtwr8Nkx4T+/Za+fn/YF+xjpYNrAAICJy0Piffat3r9bgDFUtE9HBUPSzzlQgNgB4DIKalow0Lhj2w4+sA3UVCwAiIkeUpcsSA3ruNVhDnQ4PZ0BRZJ2poAnaoPqoijz0YfMbTTWpmsA6UmewACAiirhJK2bsVtyWmArBRQD2sc5D/0uBVyDyIODNmT3ozves83QECwAiooia1jStl2jPGYBcC6CvdR7qkPWA3JfY2HLT/an711mH2R4WAEREEeP7vvfWsasvgOr3AOxpnYe6QPG6QmbNHnx3eVSfJGABQEQUIZcsv2r3MMjMU+Ac6yyUFY+K4IIHB939hnWQj/OsAxARUbuLGq8oDYLM82z8Y+VMVTw/vfGbo62DfBx7AIiIjPm+7715zOq7AVxmnYVy6u7P/KHft3zfD62DACwAiIhMzVgxo6Qlk1gIyEjrLJR7oqjr1YKxd6fubjbPYh2AiKhQTUtf3Q89WhsAnGadhfJHgcdlY/HQ2anbV1vmYAFARGSgLO0X9++5djlUv2KdhUz8snWnvl9bMNDfaBUgYXVhIqJC5fu+l9lnTSUUg6yzkJn9kq2thww69Ozaxx9/3OQxwaTFRYmICtmbx6y5GyHKrHOQLYWm3vjCmtcBXGlxfQ4BEBHl0fSGK4crdKl1DoqU1Owhd9Xk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");

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
    setPage("select-group");
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
          setPage('group-call');
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
            <img src={groupImage} />
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
