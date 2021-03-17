import React from 'react';
import { Link } from "react-router-dom";

import './style.css'


const SignupMessage = (props) => {


return (
<div className="container">
      <div className="text-center">
        <h4 className="signupMessageHeader">Fade In</h4>
      </div>
      <br />
      <div className="text-center">
        <h6 className="signupMessage">Rock on. Welcome to Fader. Now just sign in.</h6>
      </div>
      <br />
      <div className="text-center">
        <Link to="/login">
        <button type="submit" className="btn btn-secondary" id="signupMessageBtn" >Go to Login</button>
        </Link>
      </div>{" "}
    </div>

);
}


export default SignupMessage;