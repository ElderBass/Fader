import React, { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import LoginMessage from "../../components/Login/LoginMessage";
import { useUserContext } from "../../utils/UserState";
import { LOGIN_USER } from "../../utils/action";
import API from "../../utils/API";
import "./style.css";

const Login = (props) => {
  const [state, dispatch] = useUserContext();

  const [ validate, setValidate ] = useState({
    isPasswordCorrect: true,
    isEmailCorrect: null,
  })

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    API.login(user)
      .then((result) => {
        
        let userData = JSON.stringify(result.data);
        localStorage.setItem("user", userData);
        dispatch({
          type: LOGIN_USER,
          user: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
        setValidate({
          isPasswordCorrect: false,
        })
      })
  };

  return (
    <>
      {!state.isLoggedIn ? (
        <LoginForm validated={validate} handleSignIn={handleSignIn} />
      ) : (
        <LoginMessage />
      )}
    </>
  );
};

export default Login;
