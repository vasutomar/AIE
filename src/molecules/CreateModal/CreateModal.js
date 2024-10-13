import React from "react";
import Post from "./Post";
import Todo from "./Todo";
import "../Alert/Alert.scss";
import "./CreateModal.scss";

function CreateModal(props) {
  const { type } = props;

  return (<div className="modal-main">
    {type == 'post' ? <Post /> : <Todo />}
  </div>);
}

export default CreateModal;
