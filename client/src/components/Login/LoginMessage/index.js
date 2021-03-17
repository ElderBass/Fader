import React from "react";
import { Link } from "react-router-dom";

import "./LoginMessage.css";

const LoginMessage = (props) => {
  return (
    <div className="container" id="loginMessageContainer">
      <div className="text-center">
        <h4 className="loginMessageHeader">FADE IN</h4>
      </div>
      <br />
      <div className="text-center">
        <h6 id="loginMessage">You're signed in.</h6>
      </div>
      <br />
      <div className="text-center">
        <Link to="/">
          <button type="submit" className="btn btn-secondary" id="loginMessageBtn" >Continue</button>
        </Link>
        <br /><br />
      </div>{" "}
    </div>
  );
};

export default LoginMessage;
