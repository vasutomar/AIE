import React, { useEffect, useState } from "react";

function ChatTabView({ socket }) {
  function sendMessage() {
    socket.send(document.getElementById('create-post-body').value);
  }

  function updateChats(msg) {
    const chatsElement = document.getElementById('chats');

    const chatHolder = document.createElement('div');
    chatHolder.classList.add('user-and-comment');
    chatHolder.classList.add('flex-row');

    const chat = document.createElement('div');
    chat.classList.add('name');
    chat.innerHTML = msg;

    chatHolder.appendChild(chat);
    chatsElement.appendChild(chatHolder);
  }

  function addSocketSendEvent() {
    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      updateChats(event.data);
    };
  }

  useEffect(() => {
    addSocketSendEvent();
  }, []);

  return (
    <div className="chat-tab-view">
      <div id="chats" className="chats">
        
      </div>
      <textarea
        className="inp"
        placeholder="Content..."
        id="create-post-body"
      />
      <button onClick={() => sendMessage()}>Send Chat</button>
    </div>
  );
}

export default ChatTabView;
