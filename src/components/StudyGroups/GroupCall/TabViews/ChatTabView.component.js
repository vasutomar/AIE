import React, { useEffect, useState } from "react";

function ChatTabView({ socket, establishConnection }) {
  
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  function sendMessage() {
    socket.send(message);
    setMessage('');
  }

  function updateChats(msg) {
    const chatsCopy = [...chats];
    chatsCopy.push(msg);
    setChats(chatsCopy);
  }

  function addSocketSendEvent() {
    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      updateChats(event.data);
    };
  }

  useEffect(() => {
    if (!socket) establishConnection();
    else addSocketSendEvent();
  }, [])

  return (
    <div className="chat-tab-view">
      <div className="chats">
        {chats.map((chat) => {
          return (
            <div className="user-and-comment flex-row">
              <div className="name">{chat}</div>
            </div>
          );
        })}
      </div>
      <textarea
        className="inp"
        placeholder="Content..."
        id="create-post-body"
        onInput={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send Chat</button>
    </div>
  );
}

export default ChatTabView;
