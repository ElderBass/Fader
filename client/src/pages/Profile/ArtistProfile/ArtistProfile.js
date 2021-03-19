import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../utils/UserState";
import { CURRENT_MIX } from "../../../utils/action";
import LeaveMessage from "../../../components/LeaveMessage/index";
import TestSequencer from "../../../components/realStepSequencer/index";

import "./ArtistProfile.css";

const ArtistProfile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useUserContext();

  const [mixes, setMixes] = useState({
    mixes: [],
  });

  const [artist, setState] = useState({
    id: "",
    stageName: "",
    firstName: "",
    lastName: "",
    genre: "",
    city: "",
    email: "",
    messages: [],
    connections: [],
    image: "",
  });

  useEffect(() => {
    API.getOneArtist(props.match.params.id)
      .then((user) => {
        setState({
          id: user.data._id,
          stageName: user.data.stageName,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          image: user.data.image,
          genre: user.data.genre,
          city: user.data.city,
          email: user.data.email,
          connections: user.data.connections,
          messages: user.data.messages,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    API.getAllMixes(props.match.params.id).then((result) => {
      setMixes({
        mixes: result.data,
      });
    });
  }, [state.currentMix]);

  const handleLeaveMessage = (e) => {
    e.preventDefault();
    let body = {
      artistId: artist.id,
      message: {
        message: e.target.message.value,
        image: state.user.image,
        user: state.user.stageName,
      },
    };

    API.leaveMessage(body).then((result) => {
      setState({
        ...artist,
        messages: result.data.messages,
      });
      setShow(false);
    });
  };

  const handleChangeMix = (e) => {
    let mixId = e.target.value;
    API.getOneMix(mixId).then((result) => {
      dispatch({
        type: CURRENT_MIX,
        mix: [...result.data.mixArr],
      });
    });
  };

  return (
    <>
      <div className="container profile">
        <div className="row" id="profileContainer">
          <div className="col-md-3 col-lg-3 col-sm-12 " id="connectionsBox">
            <div className="container userConnections">
              <div className="row " id="connectionsBox">
                <h5 id="connectionsHeader">CONNECTIONS</h5>
              </div>
              <div className="row" id="imagesBoxID">
                {artist.connections.length > 0 ? (
                  artist.connections.map((con) => {
                    return (
                      <Link id="imageLink" to={"/artistprofile/" + con._id}>
                        <img
                          id="connectionsBox"
                          alt={`${con.stageName}`}
                          src={con.image}
                          width="40"
                          height="40"
                        />
                      </Link>
                    );
                  })
                ) : (
                  <div className="container" id="connectionsBox">
                    <br />
                    <br />
                    <h3 id="connectionsBox">NO CONNECTIONS</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Artist Info Center Container Begin */}
          <div className="col-md-6 col-lg-6 col-sm-12 stage">
            <div className="row" id="stage">
              <div className="col-md-1 col-lg-1 col-sm-12" id="stage"></div>
              <div className="col-md-2 col-lg-2 col-sm-12" id="stage">
                <img
                  id="avatarShape"
                  src={artist.image}
                  width="40"
                  height="40"
                />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12" id="stage">
                <h3 className="stage">{artist.stageName}</h3>
                <p className="info">
                  {artist.genre} | {artist.city}
                </p>
              </div>
            </div>
            <div className="row">
              {artist.about ? (
                <p className="aboutInfo">{artist.about}</p>
              ) : null}
            </div>
            <div className="row" id="mixesSelection">
              <div className="col-md-2 col-lg-2 col-sm-12" id="stage"></div>
              <div className="col-md-1 col-lg-1 col-sm-12" id="sequenceRow">
                <label htmlFor="mixes" className="inputLabel" id="sequenceText">
                  BEATS
                </label>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12" id="stage">
                <select
                  className="form-select"
                  id="mixesSelection"
                  name="mixes"
                  onChange={handleChangeMix}
                >
                  <option selected disabled value="" id="mixSelectorOption">
                    Select a Sequence
                  </option>
                  {mixes.mixes.length > 0
                    ? mixes.mixes.map((mix) => {
                        return (
                          <option
                            id="mixSelectorOptionItems"
                            key={mix._id}
                            value={mix._id}
                          >
                            {mix.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
          </div>
          {/* Artist Info Center Container End */}
          <div className="col-md-3 col-lg-3 col-sm-12" id="messagesBox">
            <div className="container userMessages">
              <div className="row" id="messagesBox">
                <h5 id="messagesHeader">MESSAGES</h5>
              </div>
              <div className="row" id="messageBox">
                {artist.messages.length > 0 ? (
                  artist.messages.map((mess) => {
                    return (
                      <div id="messageBox">
                        <img
                          id="messageBox"
                          src={mess.image}
                          width="35"
                          height="35"
                          alt={mess.user}
                        />
                        <p id="messageBox" style={{ fontSize: "10px" }}>
                          {mess.message}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div id="messagesBox">
                    <br />
                    <br />
                    <h6 id="messagesBox">NO MESSAGES</h6>
                  </div>
                )}
              </div>
              {state.isLoggedIn ? (
                <LeaveMessage
                  handleClose={handleClose}
                  handleShow={handleShow}
                  show={show}
                  handleLeaveMessage={handleLeaveMessage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="row browse">
        <Link to="/artists" id="routerLink">
          <i className="fas fa-search" style={{ color: "#c12a75" }}>
            {" "}
          </i>
          <p className="browseArtistsLink">Browse More Artists</p>
        </Link>
      </div>
      <TestSequencer />
    </>
  );
};

export default ArtistProfile;
