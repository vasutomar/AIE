import React, { useEffect, useState } from "react";
import "./Todo.scss";
import { get, getAppUrl, patch } from "../../utils/request.util";

function Todo() {
  const [todoGroups, setTodoGroups] = useState([
    {
      title: "Not Started 📦",
      src: "",
      id: "not-started",
      bgColor: "color-bg-white",
      items: [],
    },
    {
      title: "In Progress ⌛",
      src: "",
      id: "in-progress",
      bgColor: "color-bg-F5C451",
      items: [],
    },
    {
      title: "Completed! 🎉",
      src: "",
      id: "completed",
      bgColor: "color-bg-68CC58",
      items: [],
    },
  ]);

  const stateIndexMapping = {
    "not-started": 0,
    "in-progress": 1,
    "completed": 2,
  };

  const [currentDraggingItem, setCurrentDraggingItem] = useState();

  function handleDragStart(item) {
    setCurrentDraggingItem(item);
  }

  function handleDragDrop(groupId) {
    updateTodo(currentDraggingItem.todo_id, groupId);
  }

  function initializeEvents() {
    todoGroups.forEach((item) => {
      const element = document.getElementById(item.id);
      element.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
    });
  }

  function updateTodo(id, state) {
    patch(
      `${getAppUrl()}/todo/${id}`,
      {
        state,
      },
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        console.log("response", response);
        const todoCopy = [...todoGroups];
        const itemCurrentState = currentDraggingItem.state;
        const currentStoredIndex = todoCopy[
          stateIndexMapping[itemCurrentState]
        ].items.findIndex((i) => {
          return i.todo_id === currentDraggingItem.todo_id;
        });
        todoCopy[stateIndexMapping[itemCurrentState]].items.splice(
          currentStoredIndex,
          1
        );
        const itemToPush = { ...currentDraggingItem };
        itemToPush.state = state;
        todoCopy[stateIndexMapping[state]].items.push(itemToPush);
        setTodoGroups(todoCopy);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  function getData() {
    get(
      `${getAppUrl()}/todo/`,
      {},
      (response) => {
        const data = response.data.data;
        const keys = Object.keys(stateIndexMapping);
        const notStarted = data.filter((e) => e.state === keys[0]);
        const inProgress = data.filter((e) => e.state === keys[1]);
        const completed = data.filter((e) => e.state === keys[2]);

        const todoCopy = [...todoGroups];
        todoCopy[0].items = notStarted;
        todoCopy[1].items = inProgress;
        todoCopy[2].items = completed;

        setTodoGroups(todoCopy);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  useEffect(() => {
    initializeEvents();
    getData();
  }, []);

  useEffect(() => {
    /* Do Nothing */
  }, [todoGroups]);

  return (
    <div className="todo-layout">
      {todoGroups.map((group, index) => {
        return (
          <div
            onDrop={() => handleDragDrop(group.id)}
            key={group.id}
            id={group.id}
            className="todo-group"
          >
            <label>{group.title}</label>
            <div className="item-holder">
              {group.items.map((item) => {
                return (
                  <div
                    draggable
                    className={`todo-item ${group.bgColor}`}
                    key={item.title}
                    onDragStart={() => handleDragStart(item)}
                  >
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
