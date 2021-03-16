import React from "react";
import { Link } from "react-router-dom";

import "./LoginMessage.css";

const LoginMessage = (props) => {
  return (
    <div className="container">
      <div className="text-center">
        <h4 id="logInMessageContainer" className="loginMessageHeader">Excellent!</h4>
      </div>
      <br />
      <div className="text-center">
        <h6 id="logInMessageContainer">You're signed in.</h6>
      </div>
      <br />
      <div className="text-center" id="logInMessageContainer">
        <Link to="/">
          <button type="submit" className="btn btn-default" id="logInBtn`" >Continue</button>
        </Link>
        <br /><br />
      </div>{" "}
    </div>
  );
};

export default LoginMessage;
