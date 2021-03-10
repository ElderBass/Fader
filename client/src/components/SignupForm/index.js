import React from "react";

function SignupForm() {

    const styles = {
        alert: {
            display: "none",
        }
    }
  return (
    <div
      className="modal fade"
      id="signUpModal"
      tabindex="-1"
      aria-labelledby="mixes"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div claclassNamess="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="mixes">
              Sign Up
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3 needs-validation" id="signup" novalidate>
              <div className="col-md-6">
                <label for="email-input">Email address*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email-input"
                  name="email"
                  placeholder="Email"
                  required
                ></input>
                <div class="invalid-feedback">
                  You must enter a valid email address.
                </div>
              </div>
              <div className="col-md-6">
                <label for="password-input" required>
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
                <div class="invalid-feedback">
                  You must enter a valid password. Minimum 8 characters.
                </div>
              </div>
              <div className="col-md-6">
                <label for="first-name-input">First Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name-input"
                  name="first_name"
                  placeholder="First Name"
                  required
                ></input>
                <div className="invalid-feedback">
                  You must enter your first name.
                </div>
              </div>
              <div className="col-md-6">
                <label for="last-name-input">Last Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name-input"
                  name="last_name"
                  placeholder="Last Name"
                  required
                ></input>
                <div className="invalid-feedback">
                  You must enter your last name.
                </div>
              </div>
              <div className="col-md-6">
                <label for="stage-name-input">Stage Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="stage-name-input"
                  name="stage_name"
                  placeholder="Stage Name"
                  required
                ></input>
                <div className="invalid-feedback">
                  You must enter your stage/artist name.
                </div>
              </div>
              <div claclassNames="col-md-6">
                <label for="genre-input">Genre*</label>
                <select
                  className="form-select"
                  id="genre-input"
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
                <label for="city-input">City*</label>
                <input
                  type="text"
                  class="form-control"
                  id="city-input"
                  name="city"
                  placeholder="City"
                  required
                ></input>
                <div className="invalid-feedback">
                  You must enter your city.
                </div>
              </div>
              <div
                style={styles.alert}
                id="alert"
                class="alert alert-danger"
                role="alert"
              >
                <span
                  className="glyphicon glyphicon-exclamation-sign"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Error:</span>{" "}
                <span className="msg"></span>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  id="signupBtn"
                  className="btn btn-default"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
