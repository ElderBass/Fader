import React from "react";

import "./Logout.css";

const LogoutMessage = (props) => {
  return (
    <div className="container" id="logOutContainer">
      <div className="text-center">
        <h4 className="logOutMessageHeader">Fade Away!</h4>
      </div>
      <br></br>
      <div className="text-center">
        <h6  id="logStatusQuestion">... you sure about that?</h6>
      </div>
      <br></br>
      <div className="text-center"  id="logStatusQuestion">
          <button onClick={props.logout} type="submit" id="logOutBtn"className="btn btn-default">Logout</button>
      </div>{" "}
      <br></br>

    </div>
  );
};

export default LogoutMessage;
