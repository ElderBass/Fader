import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const LoginMessage = (props) => {
  return (
    <div className="container">
      <div className="text-center">
        <h4 className="loginMessageHeader">Excellent!</h4>
      </div>
      <hr />
      <div className="text-center">
        <h6>You're all signed in. Go make some magic happen.</h6>
      </div>
      <hr />
      <div className="text-center">
        <Link to="/">
          <button type="submit" className="btn btn-default" id="buttonText" >Continue</button>
        </Link>
      </div>{" "}
    </div>
  );
};

export default LoginMessage;
