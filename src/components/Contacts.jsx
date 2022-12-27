import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import "./contacts.scss";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  // console.log("currentSelected", currentSelected);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  return (
    <div className="contact-container">
      <div className="brand">
        <img src={Logo} alt="" />
        <h3>snappy</h3>
      </div>
      <div className="main-contact">
        {contacts.map((item, index) => {
          return (  
            <div
              key={index}
              className={`contact-item ${
                currentSelected === index  ? "selected-contact" : ""
              }`}
              onClick={() => changeCurrentChat(index, item)}
            >
              <img
                src={`data:image/svg+xml;base64,${item.avatarImage}`}
                alt=""
              />
              <h3>{item.username}</h3>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        {currentUser ? (
          <>
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
            <h3>{currentUserName}</h3>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Contacts;
