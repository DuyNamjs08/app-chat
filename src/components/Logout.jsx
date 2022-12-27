import React from 'react';
import {BiPowerOff} from 'react-icons/bi'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'

function Logout(props) {
    const navigate = useNavigate()
    const handleOnclick = async() => {
     localStorage.clear()
     navigate('/login')  
    }
    return (
        <Button>
            <BiPowerOff />
        </Button>
    );
}
const Button = styled.button`
    display: flex;
    align-items: center ;
    justify-content: center;
    padding: 0.5rem;
    background-color: #9a86f3;
    border-radius: 0.5rem;
    svg{
        font-size: 1.2rem;
        color: #ebe7ff;
    }
`

export default Logout;