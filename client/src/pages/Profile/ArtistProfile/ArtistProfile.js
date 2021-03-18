import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../utils/UserState";
import { CURRENT_MIX } from "../../../utils/action";
import LeaveMessage from "../../../components/LeaveMessage/index";

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
  });

  useEffect(() => {

    let body = {
      id: props.match.params.id,
    };
    console.log("body in artist profile =", body);
    API.getOneArtist(props.match.params.id)
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
          connections: user.data.connections,
          messages: user.data.messages,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("user profile use effect currentMix = ", state.currentMix)
    API.getAllMixes(props.match.params.id)
      .then(result => {
        setMixes({
          mixes: result.data
        })
      })
  }, [state.currentMix])

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
      console.log("result data in side handle leave message = ", result.data);
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
      console.log("result inside get one mix = ", result.data);
      dispatch({
        type: CURRENT_MIX,
        mix: [...result.data.mixArr],
      });
    });
  };

  return (
    <div className="container profile">
      <div className="row" id="connectionsBox">
        <div className="col-md-4 col-lg-4 col-sm-12 " id="connectionsBox">
          <div className="container userConnections">
            <div className="row " id="connectionsBox">
              <h5 id="connectionsHeader">CONNECTIONS</h5>
            </div>
            <br />
            <div className="row" id="connectionsBox">
              {artist.connections.length > 0 ? (
                artist.connections.map((con) => {
                  return (
                    <Link to="/artistprofile">
                      <img id="connectionsBox"
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
                  <h3 id="connectionsBox">NO CONNECTIONS</h3>
                </div>
              )}
            </div>
            <br />
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12 stage">
          <div className="row">
            <div className="container" >
              <h3 className="stage">{artist.stageName}</h3>
              <p className="info">
                {artist.genre} | {artist.city}
              </p>
            </div>
          </div>
          <div className="row">
            {artist.about ? <p className="aboutInfo">{artist.about}</p> : null}
          </div>
          <div className="row">
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
                <option selected disabled value="">
                  Select a Sequence
                </option>
                {mixes.mixes.length > 0
                  ? mixes.mixes.map((mix) => {
                      return <option value={mix._id}>{mix.name}</option>;
                    })
                  : null}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12" id="messagesBox">
          <div className="container userMessages">
            <div className="row" id="messagesBox">
              <h5 id="messagesHeader">MESSAGES</h5>
            </div>
            <div className="row" id="messageBox">
              {artist.messages.length > 0 ? (
                artist.messages.map((mess) => {
                  return (
                    <div id="messageBox">
                      <img id="messageBox"
                        src={mess.image}
                        width="35"
                        height="35"
                        alt={mess.user}
                      />
                      <p id="messageBox" style={{fontSize: "10px"}}>{mess.message}</p>
                    </div>
                  );
                })
              ) : (
                <div id="messagesBox">
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
  );
};

export default ArtistProfile;
