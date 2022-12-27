import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { registerRoute } from "../utils/ApiRouter";
import { ToastContainer, toast } from "react-toastify";

function Register(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOption = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  const handleValidate = () => {
    const { username, email, password, confirmPassword } = values;
    if (username === "" || email === "" || password === "") {
      toast.error("this field is required", toastOption);
      return false;
    } else if (username.length < 5) {
      console.log(username.length);
      toast.error("username require more than 4 characters", toastOption);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOption);
      return false;
    } else if (password.length < 5) {
      toast.error("password require more than 5 characters", toastOption);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    const { username, email, password } = values;
    event.preventDefault();
    if (handleValidate()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        toast.success("success", toastOption);
        localStorage.setItem("chat-app-user", JSON.stringify(data.createUser));
        await setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };
  const handleChage = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="branch">
            <img src={Logo} alt="branch" />
            <h3>snappy</h3>
          </div>
          <input
            value={values.username}
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChage}
          />
          <input
            value={values.email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChage}
          />
          <input
            value={values.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChage}
          />
          <input
            value={values.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChage}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #131324;
  .branch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    height: 90vh;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2.5rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #d78004;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all ease-in-out 0.3s;
    &:hover {
      background-color: #d78004;
    }
  }
  span {
    color: white;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register;
