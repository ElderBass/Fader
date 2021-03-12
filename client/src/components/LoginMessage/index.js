import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const LoginMessage = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h4 className="loginMessageHeader">Excellent.</h4>
      </div>
      <hr />
      <div className="row">
        <h6>You're all signed in. Go make some magic happen.</h6>
      </div>
      <hr />
      <div className="modal-footer">
        <Link to="/">
          <button type="button">Continue to Fader</button>
        </Link>
      </div>{" "}
    </div>
  );
};

export default LoginMessage;
