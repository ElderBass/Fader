import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import LoginMessage from "../../components/Login/LoginMessage";
import { useUserContext } from "../../utils/UserState";
import { LOGIN_USER } from "../../utils/action";
import API from "../../utils/API";
import "./style.css";

const Login = (props) => {
  const [state, dispatch] = useUserContext();

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log("user in login =", user);
    API.login(user)
      .then((result) => {
        console.log("result in login = ", result.data);
        dispatch({
          type: LOGIN_USER,
          user: result.data,
        });
        //window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!state.isLoggedIn ? (
        <LoginForm handleSignIn={handleSignIn} />
      ) : (
        <LoginMessage />
      )}
    </>
  );
};

export default Login;
