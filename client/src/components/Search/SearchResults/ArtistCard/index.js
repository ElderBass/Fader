import React from "react";
import { useUserContext } from "../../../../utils/UserState.js";
import { GET_ARTIST } from "../../../../utils/action";
import { generatePath } from "react-router-dom";
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
    window.location.href="/artistprofile"
  };

  generatePath(`/artistprofile/:id`, { id: props.id })

  return (
    
      <div className="card Artist" onClick={getArtist}>
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
        </div>
      </div>

  );
};

export default ArtistCard;
