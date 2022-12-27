import React, { useState, useEffect, useRef } from "react";
import Logout from "./Logout";
import "./chatContainer.scss";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/ApiRouter";
// const listmess = [
//   {
//     myself: "123",
//     mess: "Cách hiểu thứ nhất (đoạn ý)",
//   },
//   { myself: "234", mess: "name dgagd" },
//   { myself: "123", mess: "hello" },
//   { myself: "123", mess: "hello" },
//   { myself: "234", mess: "nam" },
//   { myself: "123", mess: "hello" },
//   { myself: "123", mess: "hello" },
//   { myself: "234", mess: "duynam" },
//   { myself: "123", mess: "hello" },
//   { myself: "234", mess: "nam dz" },
// ];

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // ===========================================================
  const handleSendMsg = async (msg) => {
    try {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
      const response = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      console.log("response", response);
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetAllMsg = async () => {
    try {
      const respone = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log("handleGetAllMsg", respone);
      setMessages(respone.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllMsg();
  }, [currentChat]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="logo-friend">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt=""
          />
          <h3>{currentChat.username}</h3>
        </div>
        <div className="logo-logout">
          <Logout />
        </div>
      </div>
      <div className="chat-message">
        {messages.map((item) => {
          return (
            <div
              ref={scrollRef}
              className={`message ${item.fromSelf ? "sender" : "retreave"}`}
            >
              <div className="content-chat">
                <p className="messageItem">{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

export default ChatContainer;
