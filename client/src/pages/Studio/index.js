import React from "react";
import TestSequencer from "../../components/realStepSequencer/index";
import { Link } from "react-router-dom";

import "./studioStyle.css";

const Studio = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h6 style={{ color: "#C12A75", textAlign: "center" }}>Having Fun?</h6>
        <Link to="/signup" id="routerLink">
          <h6 style={{ color: "#C12A75",  textAlign: "center" }}>
            <span id="signupSpan">Sign Up</span> For Free
          </h6>
        </Link>
      </div>
      <div className="row">
        <TestSequencer />
      </div>
    </div>
  );
};

export default Studio;
