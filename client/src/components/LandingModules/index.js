import React from "react";
import phonesIcon from '../../assets/phones-icon.png';
import profileIcon from '../../assets/profile-icon.png';
import studioIcon from '../../assets/studio-icon.png';
import './style.css';

function LandingModules() {
    function clickHandler() {
        console.log("button clicked!");
    }

  return (
    <div className="containerCustom">
        <div className="gridRow" onClick={clickHandler}>
            <a href="google.com" className="landingBtn logSignBtn">
                <img className="landingImg" src={phonesIcon} alt="login/signup modal" onClick={clickHandler} />
            </a>
            <p className="btnText">Log in or signup here!</p>
        </div>
        <div className="gridRow">
            <a href="google.com" className="landingBtn" id="browseBtn">
                <img className="landingImg" src={profileIcon} alt="browse artists modal" onClick={clickHandler} />
            </a>
            <p className="btnText">Browse artists here!</p>
        </div>
        <div className="gridRow">
            <a href="google.com" className="landingBtn" id="placeholderBtn">
                <img className="landingImg" src={studioIcon} alt="PLACEHOLDER modal" onClick={clickHandler} />
            </a>
            <p className="btnText">PLACEHOLDER</p>
        </div>
    </div>
  );
}

export default LandingModules;