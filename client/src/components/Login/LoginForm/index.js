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
        <hr className="pageBreak"></hr>
      </div>
      <div className="row">
        <form
          className="login needs-validation"
          noValidate
          onSubmit={props.handleSignIn}
        >
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              placeholder="Email"
              name="email"
              required
            ></input>
            <div className="invalid-feedback">
              This email does not match our records.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              name="password"
              placeholder="Password"
              required
            ></input>
            <div className="invalid-feedback">
              Incorrect Password. Please Try Again.
            </div>
          </div>
          <hr />
          <div className="row loginFooter">
            <button type="submit" id="loginBtn" className="btn">
              Login
            </button>
            {/* <a className="closeLogin" href="/"> */}
              <button onClick={handleCloseLogin} href="/" type="submit" id="closeLogin" className="btn btn-default">
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
