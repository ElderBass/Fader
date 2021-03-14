import React from "react";
import FollowButton from "./FollowButton";
import FollowingMessage from "./FollowingMessage";
import { useUserContext } from "../../../../../utils/UserState";

const Follow = (props) => {
  const [state, dispatch] = useUserContext();

  return (
    <>
      {state.user.following.includes(props.id) ? (
        <FollowingMessage />
      ) : (
        <FollowButton follow={props.follow} />
      )}
    </>
  );
};

export default Follow;
