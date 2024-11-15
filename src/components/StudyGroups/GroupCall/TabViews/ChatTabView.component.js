import React from "react";

function ChatTabView({ chats }) {
  return (
    <div className="chat-tab-view">
      <div className="chats">
        {chats.map((chat) => {
          return (
            <div className="user-and-comment flex-row">
              <div className="name">{chat.name}:</div>
              <div className="comment">{chat.comment}</div>
            </div>
          );
        })}
      </div>
      <textarea
        className="inp"
        placeholder="Content..."
        id="create-post-body"
      />
      <button>Send Chat</button>
    </div>
  );
}

export default ChatTabView;
