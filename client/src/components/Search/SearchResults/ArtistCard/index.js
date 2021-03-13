import React from "react";
import { useUserContext } from "../../../../utils/UserState.js";
import { GET_ARTIST, UPDATE_USER } from "../../../../utils/action";
import { Link } from "react-router-dom";

import API from "../../../../utils/API";
//import { generatePath } from "react-router-dom";
import "./style.css";

const ArtistCard = (props) => {
  const [state, dispatch] = useUserContext();

  const getArtist = (e) => {
    e.preventDefault();
    console.log("clickbait lol");
    let id = props.id;
    dispatch({
      type: GET_ARTIST,
      id: id,
    });
    // window.location.href = "/artistprofile";
  };
  //this is working
  const handleFollowArtist = (e) => {
    e.preventDefault();
    let body = { target: props.artist, user: state.user.id };
    state.user.connections.push(props.artist);

    dispatch({
      type: UPDATE_USER,
      user: state.user,
    });
    API.addConnection(body)
      .then((response) => {
        //this returns the user's data and not the added connection
        console.log("result in add connection frontend = ", response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Link to={"/artistprofile/" + props.id}>
      <div className="card Artist">
        <div className="img-container">
          <img alt={`Photo of ${props.stageName}`} src={props.image} />
        </div>
        <div className="content">
          <ul>
            <li>
              <strong>Stage Name:</strong> {props.stageName}
            </li>
            <li>
              <strong> Real Name:</strong> {props.firstName} {props.lastName}
            </li>
            <li>
              <strong>Genre:</strong> {props.genre}
            </li>
            <li>
              <strong>Location:</strong> {props.city}
            </li>
          </ul>
          <button type="button" onClick={handleFollowArtist}>
            Follow Artist
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
