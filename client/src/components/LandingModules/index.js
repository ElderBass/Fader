import React from "react";
import phonesIcon from "../../assets/phones-icon.png";
import profileIcon from "../../assets/profile-icon.png";
import studioIcon from "../../assets/studio-icon.png";
import { Link } from "react-router-dom";
import "./style.css";

const LandingModules = (props) => {
  console.log(props.history);
  const clickHandler = () => {
    console.log("button clicked!");
  };

  //const handleSigup = () => {};

  return (
    <div className="containerCustom">
      <Link to="/signup">
        <div className="gridRow" onClick={clickHandler}>
          <img
            className="landingImg"
            src={phonesIcon}
            alt="login/signup modal"
          />
          <p className="btnText">Log in or signup here!</p>
        </div>
      </Link>
      <Link to="/artists">
        <div className="gridRow">
          <img
            className="landingImg"
            src={profileIcon}
            alt="browse artists modal"
            onClick={clickHandler}
          />
          <p className="btnText">Browse artists here!</p>
        </div>
      </Link>
      <div className="gridRow">
        <a href="google.com" className="landingBtn" id="placeholderBtn">
          <img
            className="landingImg"
            src={studioIcon}
            alt="PLACEHOLDER modal"
            onClick={clickHandler}
          />
        </a>
        <p className="btnText">PLACEHOLDER</p>
      </div>
    </div>
  );
};

export default LandingModules;
