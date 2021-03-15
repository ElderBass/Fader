import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../../utils/UserState.js";
import { GET_ARTIST, UPDATE_USER } from "../../../../utils/action";
import { Link } from "react-router-dom";
import Follow from "./Follow/index";
import artistcardknob from "../../../../assets/images/artistcardknob.png";

import API from "../../../../utils/API";
//import { generatePath } from "react-router-dom";
import "./style.css";

const ArtistCard = (props) => {
  const [state, dispatch] = useUserContext();

  const [followState, setFollowState] = useState({
    following: [],
  });

  useEffect(() => {
    if (state.user.connections) {
      console.log("inside if statement in useEffect");
      //let following = [...state.user.connections];
      console.log("state.user.connections = ", state.user.connections);
      setFollowState({
        ...followState,
        following: state.user.connections,
      });
    } else {
      console.log("inside else statement of useEffect");
      return;
    }
    console.log(followState.following);
  }, []);

  const handleRenderFollow = () => {
    let ids = [];
    for (let i = 0; i < state.user.connections.length; i++) {
      ids.push(state.user.connections[i]._id);
    }
    setFollowState({
      ...followState,
      following: ids,
    });
  };

  const handleFollowArtist = (e) => {
    e.preventDefault();
    let body = { target: props.artist, targetId: props.id, user: state.user._id };
    state.user.connections.push(props.artist);


    API.addConnection(body)
      .then((response) => {
        //this returns the user's data and not the added connection
        dispatch({
          type: UPDATE_USER,
          user: response.data,
        });
        console.log("result in add connection frontend = ", response.data);
      })
      .catch((err) => console.log(err));
  };

  if (state.isLoggedIn) {
    return (
      <Link to={"/artistprofile/" + props.id}>
        <div className="card Artist">
        <div className="img-container">
          <img alt={`Photo of ${props.stageName}`} src={artistcardknob} />
        </div>
        <div className="content">
          <ul >
            <li>
              {props.stageName}
            </li>

          </ul>
            <Follow follow={handleFollowArtist} id={props.id} />
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={"/artistprofile/" + props.id}>
        <div className="card Artist">
          <div className="img-container">
            <img alt={`Photo of ${props.stageName}`} src={artistcardknob} />
          </div>
          <div className="content">
            <ul>
              <li>
                {props.stageName}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    );
  }
};

export default ArtistCard;