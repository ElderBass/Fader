import React from "react";
import { Redirect } from "react-router";

import "./style.css";

const SignupForm = (props) => {
  const clickHandler = () => {
    window.location.assign("/")
  };

  return (
    <div className="container signupContainer">
      <div className="row">
        <h4 className="signupHeader" id="signup">
          Your Studio Awaits...
        </h4>
        <hr className="pageBreak"></hr>
      </div>
      <div className="row">
        <form
          className="row g-3 needs-validation"
          id="signup"
          noValidate
          onSubmit={props.signup}
        >
          <div className="col-md-6">
            <label htmlFor="email" className="inputLabel">Email address*</label>
            <input
              type="email"
              className="form-control"
              id="email-input"
              name="email"
              placeholder="Email"
              required
            ></input>
            <div className="invalid-feedback">
              You must enter a valid email address.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="password" required className="inputLabel">
              Password*
            </label>
            <input
              type="password"
              className="form-control"
              id="password-input"
              name="password"
              placeholder="Password"
              required
            ></input>
            <div className="invalid-feedback">
              You must enter a valid password. Minimum 8 characters.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" className="inputLabel">First Name*</label>
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              name="firstName"
              placeholder="First Name"
              required
            ></input>
            <div className="invalid-feedback">
              You must enter your first name.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="inputLabel">Last Name*</label>
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              name="lastName"
              placeholder="Last Name"
              required
            ></input>
            <div className="invalid-feedback">
              You must enter your last name.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="stageName" className="inputLabel">Stage Name*</label>
            <input
              type="text"
              className="form-control"
              id="stage-name-input"
              name="stageName"
              placeholder="Stage Name"
              required
            ></input>
            <div className="invalid-feedback">
              You must enter your stage/artist name.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="genre" className="inputLabel">Genre*</label>
            <select
              className="form-select"
              id="genre-input"
              name="genre"
              aria-label="Select a Genre"
              required
            >
              <option selected disabled value="">
                Please Select Your Genre
              </option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Punk">Punk</option>
              <option value="Metal">Metal</option>
              <option value="Psychedelic">Psychedelic</option>
              <option value="Rap">Rap</option>
              <option value="R&B">R&B</option>
              <option value="Jazz">Jazz</option>
              <option value="Classical">Classical</option>
              <option value="Disco">Disco</option>
              <option value="House">House</option>
              <option value="Dubstep">Dubstep</option>
              <option value="Drum and Bass">Drum and Bass</option>
            </select>
            <div className="invalid-feedback">You must select a genre.</div>
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="city" className="inputLabel">City*</label>
            <input
              type="text"
              className="form-control"
              id="city-input"
              name="city"
              placeholder="City"
              required
            ></input>
            <div className="invalid-feedback">You must enter your city.</div>
          </div>
          <div
            style={{display: "none"}}
            id="alert"
            className="alert alert-danger"
            role="alert"
          >
            <span
              className="glyphicon glyphicon-exclamation-sign"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Error:</span>{" "}
            <span className="msg"></span>
          </div>
          <hr className="pageBreak"></hr>
          <div className="row" id="bottomBtns">
            <button type="submit" className="btn btn-secondary" id="signupBtn">
                Sign Up
            </button>
            <button type="button" className="btn btn-secondary" id="closeBtn" onClick={clickHandler}>
              {/* <Redirect to="/">Cancel</Redirect> */}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
