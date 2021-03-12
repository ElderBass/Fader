import React from "react";
import { useUserContext } from "../../utils/UserState";

import "./style.css";

const Profile = (props) => {
  const [state, dispatch] = useUserContext();

  //need a post route for bio/description information
  //need get route for any messages associated with this muhfug
  //need get route for retrieving any "connections" user has

  return (
    <div className="profile">
      <h3 className="stage">{state.user.stageName}</h3>
      <p className="info">
        {state.user.firstName} {state.user.lastName} | {state.user.genre} |{" "}
        {state.user.city}
      </p>
    </div>
  );
};

export default Profile;
