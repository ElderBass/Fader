import React from "react";
import phonesIcon from "../../assets/knobs.png";
import profileIcon from "../../assets/drumpads.png";
import studioIcon from "../../assets/faders.png";
import { Link } from "react-router-dom";
import "./LandingModules.css";

const LandingModules = (props) => {

  return (
    <div className="containerCustom">
      <Link to="/signup"  style={{ textDecoration: 'none'}}>
        <div className="gridRow">
          <img
            className="landingImg"
            src={phonesIcon}
            alt="login/signup modal"
          />
          <p className="btnText">SIGN UP!</p>
        </div>
      </Link>
      <Link to="/artists" style={{ textDecoration: 'none'}}>
        <div className="gridRow" >
        
          <img
            className="landingImg"
            src={profileIcon}
            alt="browse artists modal"
          />
          <p className="btnText">BROWSE PROFILES</p>
        </div>
      </Link >
      <Link to="/studio">
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
