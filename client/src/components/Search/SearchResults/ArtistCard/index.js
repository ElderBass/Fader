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
      setFollowState({
        ...followState,
        following: state.user.connections,
      });
    } else {
      return;
    }
  }, []);

  const handleFollowArtist = (e) => {
    e.preventDefault();
    let body = {
      target: props.artist,
      targetId: props.id,
      user: state.user._id,
    };
    state.user.connections.push(props.artist);

    API.addConnection(body)
      .then((response) => {
        //this returns the user's data and not the added connection
        dispatch({
          type: UPDATE_USER,
          user: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  if (state.isLoggedIn) {
    return (
      <Link id="routerLink" to={"/artistprofile/" + props.id}>
        <div id="artistCard" className="card">
          <div className="row"> 
          <div id="img-container">
            <img
              alt={`Photo of ${props.stageName}`}
              width="100"
              height="100"
              src={props.image}
              style={{borderRadius: "50%"}}
            />
          </div>
          </div>
          <div className="row">
            <h5 id="stageName">{props.stageName}</h5>
          </div>
          <div className="row">
            <Follow follow={handleFollowArtist} id={props.id} />
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link id="routerLink" to={"/artistprofile/" + props.id}>
        <div id="artistCard" className="card Artist">
          <div className="row"> 
          <div id="img-container">
            <img
              id="artistImage"
              alt={`Photo of ${props.stageName}`}
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
              src={props.image}
            />
            </div>
          </div>
          <div className="row">
            <h5  id="stageName">{props.stageName}</h5>
          </div>
        </div>
      </Link>
    );
  }
};

export default ArtistCard;
