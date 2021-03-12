import React from "react";

//import { useUserContext } from "../../utils/UserState";

const LoginForm = (props) => {
  // const [state, dispatch] = useUserContext();

  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };
  //   console.log("user in login =", user);
  //   API.login(user)
  //     .then((result) => {
  //       console.log("result in login = ", result.data);
  //       dispatch({
  //         type: LOGIN_USER,
  //         user: result.data,
  //       });
  //       //window.location.href = "/";
  //     })
  //     .catch((err) => console.log(err));
  // };

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
