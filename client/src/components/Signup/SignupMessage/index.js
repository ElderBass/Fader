import React from 'react';
import { Link } from "react-router-dom";

import './style.css'


const SignupMessage = (props) => {


return (
<div className="container">
      <div className="row">
        <h4 className="signupMessageHeader">Fade In</h4>
      </div>
      <hr />
      <div className="row">
        <h6>Rock on. Welcome to Fader. Now just sign in.</h6>
      </div>
      <hr />
      <div className="modal-footer">
        <Link to="/login">
          <button type="button">Continue to Login</button>
        </Link>
      </div>{" "}
    </div>

);
}


export default SignupMessage;