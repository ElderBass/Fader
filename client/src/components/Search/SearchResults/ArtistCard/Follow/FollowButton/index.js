import React from "react";

import "./style.css";

const FollowButton = (props) => {

  return (
    <p className="followMsg" id="followText"  onClick={props.follow}
>
      Follow
    </p>
  );
};

export default FollowButton;
