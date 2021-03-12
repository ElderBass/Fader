import React from "react";

import "./style.css";

const LogoutMessage = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h4 className="loginMessageHeader">Fade Away</h4>
      </div>
      <hr />
      <div className="row">
        <h6>You sure you want to logout?</h6>
      </div>
      <hr />
      <div className="modal-footer">
          <button onClick={props.logout} type="button">Confirm Logout</button>
      </div>{" "}
    </div>
  );
};

export default LogoutMessage;
