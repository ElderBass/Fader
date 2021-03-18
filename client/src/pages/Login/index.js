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
        //set session storage here
        let userData = JSON.stringify(result.data);
        localStorage.setItem("user", userData);
        dispatch({
          type: LOGIN_USER,
          user: result.data,
        });
        //window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.myMessage);
        setValidate({
          isPasswordCorrect: false,
        })
      })
  };

  const emailValidation = email => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return null;
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };

  const passwordValidation = password => {
    if (!password) {
      return "Please Enter Your Correct Password"
    }
    return null;
  }

  // const validate = {
  //   //email: email => nameValidation('First Name', name),
  //   email: emailValidation,
  // }; 

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
