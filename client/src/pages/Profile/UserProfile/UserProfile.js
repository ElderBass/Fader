import React, { useEffect } from "react";
import { useUserContext } from "../../../utils/UserState";
import { Link } from "react-router-dom";

import "./style.css";

const UserProfile = (props) => {
  const [state, dispatch] = useUserContext();

  //need a post route for bio/description information
  //need get route for any messages associated with this muhfug
  //need get route for retrieving any "connections" user has
useEffect(() => {
  console.log("state.user in user profile = ", state.user)
})
  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12 ">
          <div className="container connections">
            <div className="row ">
              <h5>Connections</h5>
            </div>
            <div className="row">
              {state.hasConnections ? (
                state.user.connections.map((con) => {
                  return (
                    <Link to="/artistprofile">
                      <p>{con.stageName}</p>
                      <img alt={`${con.stageName}`} src={con.image} width="20" height="20" />
                    </Link>
                  );
                })
              ) : (
                <div className="container noConnections">
                  <h3>You currently have no connections</h3>
                </div>
              )}
            </div>

            <br />
            <div className="row">
              <Link to="/artists">
                <p style={{ fontSize: "10px", color: "#C12A75" }}>
                  Browse Artists
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="row">
            <div className="container">
              <h3 className="stage">{state.user.stageName}</h3>
              <p className="info">
                {state.user.firstName} {state.user.lastName} |{" "}
                {state.user.genre} | {state.user.city}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="container connections">
            <div className="row">
              <h5>Messages</h5>
            </div>
            <div className="row">
              <div>(Messages go here or something)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
