import React from "react";


const LoginForm = (props) => {


  return (
    <div className="container loginContainer">
      <div className="row">
        <h5 className="loginHeader" id="login">
          Login
        </h5>
        <hr />
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
              Please enter your email for your Quilava account.
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
              Please enter your password for your Quilava account.
            </div>
          </div>
          <hr />
          <div className="row loginFooter">
            <button type="submit" id="loginBtn" className="btn btn-default">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
