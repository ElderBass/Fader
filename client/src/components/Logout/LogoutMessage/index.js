import React from "react";


import "./Logout.css";

const LogoutMessage = (props) => {
  return (
    <div className="container" id="logOutContainer">
      <div className="text-center">
        <h4 className="logOutMessageHeader">FADE OUT</h4>
      </div>
      <br></br>
      <div className="text-center">
        <h6  id="logStatusQuestion">Are you sure?</h6>
      </div>
      <br></br>
      <div className="text-center"  id="logStatusQuestion">
          <button onClick={props.logout} type="submit" id="logoutMessageBtn"className="btn btn-secondary">Logout</button>
      </div>{" "}
      <br></br>


    </div>
  );
};

export default LogoutMessage;
