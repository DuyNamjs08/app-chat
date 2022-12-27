import React, { useEffect, useState  , useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsers , host } from "../utils/ApiRouter";
import Contacts from "../components/Contacts";
import Wellcome from "../components/Wellcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client'

function Chat(props) {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);

  const handleCallApi = async () => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    setCurrentUser(user);
    if (user.avatarImage) {
      const { data } = await axios.get(`${getAllUsers}/${user._id}`);
      setContacts(data);
    } else {
      navigate("/set_avatar");
    }
  };
  const handleChatChange = (chat) => {
    // console.log("chat", chat);
    setCurrentChat(chat);
  };
  useEffect(() => {
    handleCallApi();
  }, []);
  useEffect(() => {
   if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user", currentUser._id);
   }
  }, [currentUser]);
  return (
    <Container>
      <div className="container">
        <div className="contacts">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        <div className="chat-container">
          {currentChat ? <ChatContainer socket={socket} currentChat={currentChat} currentUser={currentUser} /> : <Wellcome />}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* gap: 1rem; */
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: flex;
    .contacts {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .chat-container {
      flex: 4;
      background: #00000076;
    }

    /* display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } */
  }
`;

export default Chat;
