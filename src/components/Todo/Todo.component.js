import React from "react";
import "./Todo.scss";

function Todo() {
  const todoGroups = [
    {
      title: "Not Started 📦",
      src: "",
      id: "not-started",
      bgColor: "color-bg-white",
      items: [
        {
          title: "Title1",
          deadline: "10/02/2024",
        },
      ],
    },
    {
      title: "In Progress ⏱︎",
      src: "",
      id: "in-progress",
      bgColor: "color-bg-F5C451",
      items: [
        {
          title: "Title1",
          deadline: "10/02/2024",
        },
      ],
    },
    {
      title: "Completed! 🎉",
      src: "",
      id: "completed",
      bgColor: "color-bg-68CC58",
      items: [
        {
          title: "Title1",
          deadline: "10/02/2024",
        },
      ],
    },
  ];

  return (
    <div className="todo-layout">
      {todoGroups.map((group, index) => {
        return (
          <div key={group.id} id={group.id} className="todo-group">
            <label>{group.title}</label>
            <div className="item-holder">
              {group.items.map((item) => {
                return (
                  <div className={`todo-item ${group.bgColor}`} key={item.title}>
                    <h3>{item.title}</h3>
                    {item.deadline && (
                      <div className="deadline">Deadline : {item.deadline}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
