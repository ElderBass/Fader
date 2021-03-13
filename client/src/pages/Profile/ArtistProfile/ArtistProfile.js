import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../utils/UserState";

import "./style.css";

const ArtistProfile = (props) => {
  const [state, dispatch] = useUserContext();

  const [artist, setState] = useState({
    id: "",
    stageName: "",
    firstName: "",
    lastName: "",
    genre: "",
    city: "",
    email: "",
  });

  useEffect(() => {
    API.getOneArtist(state.targetId)
      .then((user) => {
        console.log("result in useEffect of ArtistProfile =", user.data);
        setState({
          id: user.data._id,
          stageName: user.data.stageName,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          genre: user.data.genre,
          city: user.data.city,
          email: user.data.email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12 ">
          <div className="container">
            <div className="row connections">
              <h4>Connections</h4>
            </div>
            <div className="row">
              <div>(Show All connections here)</div>
            </div>
            <br />
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="row">
            <div className="container">
              <h3 className="stage">{artist.stageName}</h3>
              <p className="info">
                {artist.firstName} {artist.lastName} | {artist.genre} |{" "}
                {artist.city}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="container">
            <h4>Messages</h4>
            <div>(Messages go here or something)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
