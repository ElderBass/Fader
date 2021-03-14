import React, { useEffect } from "react";
import { useUserContext } from "../../../utils/UserState";
import { Link } from "react-router-dom";

import "./style.css";

const UserProfile = (props) => {
  const [state, dispatch] = useUserContext();

  useEffect(() => {
    console.log("state.user in user profile = ", state.user);
  });
  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12 ">
          <div className="container connections">
            <div className="row ">
              <h5>Connections</h5>
            </div>
            <div className="row">
              {state.user.connections.length > 0 ? (
                state.user.connections.map((con) => {
                  return (
                    <Link to="/artistprofile">
                      <img
                        alt={`${con.stageName}`}
                        src={con.image}
                        width="40"
                        height="40"
                      />
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
              {state.user.messages.length > 0 ? (
                state.user.messages.map((mess) => {
                  return (
                    <div>
                      <img
                        src={mess.image}
                        width="35"
                        height="35"
                        alt={mess.user}
                      />
                      <p style={{ fontSize: "10px" }}>{mess.message}</p>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h5>This thing on?</h5>
                  <h6>This artist has no messages.</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
