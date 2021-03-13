import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../utils/UserState";
import LeaveMessage from "../../../components/LeaveMessage/index";

import "./style.css";

const ArtistProfile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useUserContext();

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
    console.log(
      "props match inside useEffect Artist Profile =",
      props.match.params.id
    );

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
    //artist.messages.push(e.target.value)
    API.leaveMessage(body).then((result) => {
      console.log("result data in side handle leave message = ", result.data);
      setShow(false);
    });
  };

  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12 ">
          <div className="container connections">
            <div className="row ">
              <h5>Connections</h5>
            </div>
            <div className="row">
              {artist.connections.length > 0 ? (
                artist.connections.map((con) => {
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
                  <h5>Quiet crowd...</h5>
                  <h6>This artist has no connections.</h6>
                </div>
              )}
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
          <div className="container connections">
            <div className="row">
              <h5>Messages</h5>
            </div>
            <div className="row">
              {artist.messages.length > 0 ? (
                artist.messages.map((mess) => {
                  return (
                    <div>
                      <img
                        src={mess.image}
                        width="35"
                        height="35"
                        alt={mess.user}
                      />
                      <p style={{fontSize: "10px"}}>{mess.message}</p>
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
