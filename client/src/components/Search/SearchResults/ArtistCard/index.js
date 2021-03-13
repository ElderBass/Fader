import React from "react";
import { useUserContext } from "../../../../utils/UserState.js";
import { GET_ARTIST } from "../../../../utils/action";
import { ADD_CONNECTION } from "../../../../utils/action";
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

  const handleFollowArtist = (e) => {
    console.log("state.user in handlefollowartist = ", state.user)
    e.preventDefault();
    let body = { target: props.artist, user: state.user.id };
    console.log("inside follow artist");
    dispatch({
      type: ADD_CONNECTION
    })
    // API.getOneArtist(props.id)
    //   .then((result) => {
    //     console.log("result inside getOneArtist on handleFollowArtist = ", result.data)
    //     //result.data = an array of everyone but why..?
    //     //either do all of props or send down a props.user to use
    //     console.log("body inside getone artist artist card = ", body)
    API.addConnection(body)
      .then((response) => {
        console.log("result in add connection frontend = ", response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
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
        <button type="button" onClick={getArtist}>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
