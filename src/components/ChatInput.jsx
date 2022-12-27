import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import "./chatInput.scss";
function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emojiObject) => {
    setMsg(msg + event.emoji);
    setShowEmojiPicker(false);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  }
  return (
    <>
      <div className="input-chat-container">
        <div className="button-container">
          <div className="icon">
            <div className="emoji">
              {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          </div>
        </div>
        <form className="input-container" onSubmit={(event) => sendChat(event)} >
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="type your message here"
          />
          <button type="submit">
            <div className="btn-send">
              <IoMdSend />
            </div>
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatInput;
