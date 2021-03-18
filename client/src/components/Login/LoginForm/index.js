import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const LoginForm = (props) => {

  const handleCloseLogin = () => {
    window.location.href = "/"
  }

  return (
    <div className="container loginContainer">
      <div className="row">
        <h5 className="loginHeader" id="login">
          Login
        </h5>
      </div>
      <div className="row">
        <form
          className="login needs-validation"
          onSubmit={props.handleSignIn}
        >
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control inputClass"
              id="login-email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control inputClass"
              id="login-password"
              name="password"
              placeholder="Password"
              required
            />
            {props.validated.isPasswordCorrect ? null : <p>Incorrect Password. Please Try Again.</p>}
          </div>
          <div className="row" id="bottomBtns">
            <button type="submit" id="loginBtn" className="btn btn-secondary">
              Login
            </button>
            {/* <a className="closeLogin" href="/"> */}
            <button onClick={handleCloseLogin} href="/" type="submit" id="closeBtn" className="btn btn-secondary">
              Close
            </button>
            {/* </a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
