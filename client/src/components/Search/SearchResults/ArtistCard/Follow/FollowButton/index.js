import React from "react";

import "./style.css";

const FollowButton = (props) => {

  return (
    <button
      className="btn-default"
      onClick={props.follow}
    >
      Follow
    </button>
  );
};

export default FollowButton;
