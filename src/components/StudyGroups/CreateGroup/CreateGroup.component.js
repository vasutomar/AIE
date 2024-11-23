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
import VerticalLine from "../../../atoms/VerticalLine/VerticalLine";
import { getAppUrl, post, get } from "../../../utils/request.util";

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

  const FAQData = [
    {
      key: "what-all-can-i-do",
      question: "What all can I do?",
      answer: [
        {
          title: "Collaborative problem solving",
          subtitle:
            "Share different approaches and solutions to the same issue for a broader understanding.",
        },
        {
          title: "Sharing resources",
          subtitle:
            "Exchange study materials like notes, articles, books, and links to helpful videos or academic papers.",
        },
        {
          title: "General Discussions",
          subtitle:
            "Discuss recent news or trends related to your field of study for practical insights.",
        },
        {
          title: "Accountability tool",
          subtitle:
            "Set goals for each member and check in regularly to ensure progress is being made.",
        },
        {
          title: "Q&A Session",
          subtitle:
            "Hold timed Q&A rounds for quick clarifications on study material.",
        },
        {
          title: "Peer Teaching",
          subtitle:
            "Take turns explaining topics to the group, as teaching others helps reinforce your own understanding.",
        },
        {
          title: "Study tips and Strategy",
          subtitle: "Share personal study techniques and productivity hacks.",
        },
      ],
      type: "list-with-subtitle",
    },
    {
      key: "how-many-can-i-add",
      question: "How many members can I add?",
      answer:
        "Regular users can add upto 4 memebers.Star members can add upto 6 members",
      type: "simple-text",
    },
  ];

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

  // const addedMembers = [
  //   {
  //     name: "Rahul",
  //     key: "128fandsu129",
  //     img: person1,
  //     isOnline: true,
  //   },
  //   {
  //     name: "Samantha",
  //     key: "128fandsu139",
  //     img: person2,
  //     isOnline: false,
  //   },
  //   {
  //     name: "Sam",
  //     key: "128fandsu179",
  //     img: person3,
  //     isOnline: true,
  //   },
  //   {
  //     name: "Sarthak",
  //     key: "128fandsu180",
  //     img: person8,
  //   },
  // ];

  // const friends = [
  //   {
  //     name: "Martha",
  //     key: "128fandsu129",
  //     img: person4,
  //   },
  //   {
  //     name: "Adam",
  //     key: "128fandsu139",
  //     img: person5,
  //   },
  //   {
  //     name: "Eve",
  //     key: "128fandsu179",
  //     img: person6,
  //   },
  //   {
  //     name: "Sarthak",
  //     key: "128fandsu180",
  //     img: person7,
  //   },
  // ];

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
        about: groupAbout
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
        console.log('error', error);
      }
    );
  }

  function addMember(index) {
    const user = friends[index];
    let updatedFriends = [...friends];
    updatedFriends.splice(index,1);
    setFriends(updatedFriends);
    let updatedMembers = addedMembers;
    updatedMembers.push(user);
    setAddedMembers(updatedMembers);
  }

  useEffect(() => {

  }, [friends]);

  useEffect(() => {
    if (fetchData) {
      getFriends();
      setFetchData(false);
    }
  }, []);

  return (
    <div className="creategroup-layout">
      <div className="main-section">
        <div className="details-section">
          <div className="details-card">
            <h2 className="underline">ENTER GROUP DETAILS</h2>
            <div className="flex-row detail">
              <label>Name</label>
              <input
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                className="nameInput"
              ></input>
            </div>
            <div className="flex-row detail">
              <label>About</label>
              <input
                onChange={(e) => {
                  setGroupAbout(e.target.value);
                }}
                className="nameInput"
              ></input>
            </div>
            <div className="flex-row detail">
              <label>Peer Count</label>
              <div className="flex-row member-count-holder">
                {memberOptions.map((count) => {
                  return (
                    <div
                      key={`key-member-${count}`}
                      onClick={() => {
                        setPeerCount(count);
                      }}
                      className={`number ${peerCount == count ? 'selected-number' : ''}`}
                    >
                      {count}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-row detail">
              <label>Color</label>
              <div className="flex-row member-count-holder">
                {colorOptions.map((color) => {
                  return (
                    <div
                    key={`key-color-${color}`}
                      onClick={() => {
                        setGroupColor(color);
                      }}
                      className={`color-bg-${color} color ${groupColor == color ? 'selected-color' : ''}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <img alt={'group-type-image'} src={image} />
        </div>
        <div className="members-section">
          <div className="add-section">
            <div className="add-box">
              <h2 className="underline">ADD MEMBERS</h2>
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
              <h2 className="underline">PICK FROM FRIENDS</h2>
              <div className="friends">
                {friends.map((friend, index) => {
                  return (
                    <div key={friend.user_id} className="flex-row friend-holder" onClick={() => addMember(index)}>
                      <img alt={'friend-logo'} src={friend.profile_pic} />
                      <div>{friend.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="list-section">
            <h2 className="underline">MEMBER LIST</h2>
            {addedMembers.map((member) => {
              return (
                <div key={member.user_id} className="member-status">
                  <img alt={'added-member-logo'} src={member.profile_pic} />
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
        <div className="action-section">
          <button onClick={() => creategroup()}>Create</button>
          <button onClick={() => cancelCreation()}>Cancel</button>
        </div>
      </div>
      <VerticalLine height={"page"} />
      <div className="faq-section">
        <div className="headings">
          <h1 className="m-2 underline">{info.title} GROUP</h1>
          <h3 className="color-font-707070 m-2">FAQ</h3>
        </div>
        <div className="questions">
          {FAQData.map((data) => {
            return (
              <div key={data.key}>
                <h2 className="underline">{data.question}</h2>
                {data.type === "simple-text" ? (
                  <div>{data.answer}</div>
                ) : (
                  <ol>
                    {data.answer.map((answer) => {
                      return (
                        <li key={answer.title.replace(" ", "")}>
                          <h4 className="m-2">{answer.title}</h4>
                          <div>{answer.subtitle}</div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
