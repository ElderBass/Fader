import React from "react";

import "./style.css";

const ArtistCard = (props) => {
  return (
    <div className="card">
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
