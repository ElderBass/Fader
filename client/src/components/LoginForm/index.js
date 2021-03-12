import React from "react";
import { LOGIN_USER } from "../../utils/action";
import API from "../../utils/API";

import { useUserContext } from "../../utils/UserState";

const LoginForm = (props) => {

  const [ state, dispatch ] = useUserContext();

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log("user in login =", user)
    API.login(user)
      .then(result => {
        
        dispatch({
          type: LOGIN_USER,
          user: result.data
        })
      })
      .catch(err => console.log(err));

  }

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="login"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="login">
              Login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="login needs-validation" noValidate onSubmit={handleSignIn}>
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" id="loginBtn" className="btn btn-default">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
