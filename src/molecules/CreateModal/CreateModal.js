import React from "react";
import Post from "./Post";
import Todo from "./Todo";
import "../Alert/Alert.scss";
import "./CreateModal.scss";

function CreateModal(props) {
  const { type, closeModal } = props;

  return (<div className="modal-main">
    {type === 'post' ? <Post closeModal={closeModal}/> : <Todo />}
  </div>);
}

export default CreateModal;
