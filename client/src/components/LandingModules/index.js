import React from "react";
import phonesIcon from "../../assets/knobs.png";
import profileIcon from "../../assets/drumpads.png";
import studioIcon from "../../assets/faders.png";
import { Link } from "react-router-dom";
import "./LandingModules.css";

const LandingModules = (props) => {

  return (
    <div className="containerCustom">
      <Link to="/signup" id="routerLink">
        <div className="gridRow">
          <img
            className="landingImg"
            src={phonesIcon}
            alt="login/signup modal"
          />
          <p className="btnText">SIGN UP AND CREATE</p>
        </div>
      </Link>
      <Link to="/artists" id="routerLink">
        <div className="gridRow" >
        
          <img
            className="landingImg"
            src={profileIcon}
            alt="browse artists modal"
          />
          <p className="btnText">BROWSE PROFILES</p>
        </div>
      </Link >
      <Link to="/studio" id="routerLink">
        <div className="gridRow studioLink">
            <img
              className="landingImg"
              src={studioIcon}
              alt="PLACEHOLDER modal"
            />
          <p className="btnText">ENTER STUDIO</p>
        </div>
        </Link>
    </div>
  );
};

export default LandingModules;
