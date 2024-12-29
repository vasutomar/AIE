import React from "react";
import Post from "./Post";
import "../Alert/Alert.scss";
import "./CreateModal.scss";
import TodoCreate from "./TodoCreate";

function CreateModal(props) {
  const { type, closeModal } = props;

  return (<div className="modal-main">
    {type === 'post' ? <Post closeModal={closeModal}/> : <TodoCreate closeModal={closeModal}/>}
  </div>);
}

export default CreateModal;
