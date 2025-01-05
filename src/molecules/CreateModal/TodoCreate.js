import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import { post, getAppUrl } from "../../utils/request.util";

function TodoCreate({ closeModal }) {
  const createTodo = () => {
    const deadline = document.getElementById("deadline").value;
    const title = document.getElementById("create-todo-title").value;

    const payload = {
      title,
      deadline,
    };
    post(
      `${getAppUrl()}/todo/`,
      payload,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        /*Do Nothing*/
        console.log("create todo response", response);
        window.location.reload();
        closeModal();
      },
      (error) => {
        /*Handle Error*/
        console.log(error);
      }
    );
  };

  return (
    <div className="create-post-container color-bg-C7DBE6">
      <div className="header flex-row">
        <h1 className="m-8">Create Todo</h1>
        <div className="cross-button">
          <span className="material-symbols-outlined" onClick={closeModal}>
            close
          </span>
        </div>
      </div>

      <div className="body flex-column">
        <input
          className="h-3 inp"
          placeholder="To do..."
          id="create-todo-title"
        />
        <div>
          Deadline:{" "}
          <input
            placeholder="Set Deadline"
            className="m-8 w-12 deadline-input"
            type="date"
            id="deadline"
            name="deadline"
          />
        </div>
      </div>
      <div className="footer flex-row justify-content-center">
        <Button
          onClick={() => createTodo()}
          extraClass="m-8 w-12 h-3"
          buttonType={"primWhite"}
          text={"Create Todo"}
        />
      </div>
    </div>
  );
}

export default TodoCreate;
