import React from "react";

import "./style.css";

const FollowButton = (props) => {

  return (
    <button
      className="btn-default"
      type="button"
      onClick={props.follow}
    >
      Follow Artist
    </button>
  );
};

export default FollowButton;
