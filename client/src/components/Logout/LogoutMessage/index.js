import React from "react";

import "./style.css";

const LogoutMessage = (props) => {
  return (
    <div className="container">
      <div className="text-center">
        <h4 className="loginMessageHeader">Fade Away!</h4>
      </div>
      <hr />
      <div className="text-center" id="logStatusQuestion">
        <h6>... you sure about that?</h6>
      </div>
      <hr />
      <div className="text-center">
          <button onClick={props.logout} type="submit" className="btn btn-default">Logout</button>
      </div>{" "}

    </div>
  );
};

export default LogoutMessage;
