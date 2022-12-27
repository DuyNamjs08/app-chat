import React, { useState, useEffect } from "react";
import Hello from "../assets/robot.gif";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'

function Wellcome(props) {
  const navigate = useNavigate()
  const [userName , setUserName] = useState(null)
  useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("chat-app-user")).username;
    if(!user){
      navigate('/login')
    }else{
      setUserName(user)
    }
  },[])
  return (
    <Container>
      <div className="wellcome-container">
        <img src={Hello} alt="" />
        <h1>
          Welcome, <span>{userName ? userName : '' }!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .wellcome-container {
    color: white    ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        height: 25rem;
    }
    span{
        font-size: 3rem;
        color: #4e0eff;
    }
  }
`;

export default Wellcome;
