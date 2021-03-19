import React from "react";
import { Redirect } from "react-router";

import "./style.css";

const SignupForm = (props) => {
  const clickHandler = () => {
    window.location.assign("/");
  };

  return (
    <div className="container"  id="signupContainer">
      <div className="row">
        <h4 className="signupHeader" id="signup">
          Your Studio Awaits.
        </h4>
      </div>
      <div className="row">
        <form
          className="row g-3 needs-validation"
          id="signup"
          onSubmit={props.signup}
        >
          <div className="col-md-6">
            <label htmlFor="email" id="inputLabel" className="inputLabel">
              Email address
            </label>
            <input
              type="email"
              className="form-control inputClass"
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
            <label
              htmlFor="password"
              id="inputLabel"
              required
              className="inputLabel"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control inputClass"
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
            <label htmlFor="firstName" id="inputLabel" className="inputLabel">
              First Name
            </label>
            <input
              type="text"
              className="form-control inputClass"
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
            <label htmlFor="lastName" id="inputLabel" className="inputLabel">
              Last Name
            </label>
            <input
              type="text"
              className="form-control inputClass"
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
            <label htmlFor="stageName" id="inputLabel" className="inputLabel">
              Stage Name
            </label>
            <input
              type="text"
              className="form-control inputClass"
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
            <label htmlFor="genre" id="inputLabel" className="inputLabel">
              Genre
            </label>
            <select
              className="form-select selectClass"
              id="genre-input"
              name="genre"
              aria-label="Select a Genre"
              required
            >
              <option selected disabled value="">
                Please Select Your Genre
              </option>
              <option value="Pop">Pop</option>
              <option value="Synth Pop">Synth Pop</option>
              <option value="K-Pop">K-Pop</option>
              <option value="Rock">Rock</option>
              <option value="Indie Rock">Indie Rock</option>
              <option value="Punk">Punk</option>
              <option value="Grunge">Grunge</option>
              <option value="Metal">Metal</option>
              <option value="Psychedelic">Psychedelic Rock</option>
              <option value="Rap">Rap</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Trap">Trap</option>
              <option value="Boom Bap">Boom Bap</option>
              <option value="R&B">R&B</option>
              <option value="Jazz">Jazz</option>
              <option value="Classical">Classical</option>
              <option value="Disco">Disco</option>
              <option value="Nu Disco">Nu Disco</option>
              <option value="Trance">Trance</option>
              <option value="Psytrance">Psytrance</option>
              <option value="House">House</option>
              <option value="Deep House">Deep House</option>
              <option value="Classic House">Classic House</option>
              <option value="Future House">Future House</option>
              <option value="Chicago House">Chicago House</option>
              <option value="Ghetto House">Ghetto House</option>
              <option value="Dubstep">Dubstep</option>
              <option value="Drum and Bass">Drum and Bass</option>
              <option value="Future Bass">Future Bass</option>
              <option value="Techno">Techno</option>
              <option value="Acid Techno">Acid Techno</option>
              <option value="Indie Dance">Indie Dance</option>
            </select>
            <div className="invalid-feedback">You must select a genre.</div>
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="city" id="inputLabel" className="inputLabel">
              City
            </label>
            <input
              type="text"
              className="form-control inputClass"
              id="city-input"
              name="city"
              placeholder="City"
              required
            ></input>
            <div className="invalid-feedback">You must enter your city.</div>
          </div>
          <div
            style={{ display: "none" }}
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
          <div className="row" id="bottomBtns">
            <button type="submit" className="btn btn-secondary" id="signupBtn">
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              id="closeBtn"
              onClick={clickHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
