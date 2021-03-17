import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../utils/UserState";
import { Link } from "react-router-dom";
import { UPDATE_USER, CURRENT_MIX } from "../../../utils/action";
import EditAbout from "../../../components/AboutInfo/EditAbout";
import ProfilePictureForm from "../../../components/ProfilePictureForm";
import "./UserProfile.css";
import API from "../../../utils/API";
import AddAbout from "../../../components/AboutInfo/AddAbout";

const UserProfile = (props) => {
  const [state, dispatch] = useUserContext();

  const [mixes, setMixes] = useState({
    mixes: [],
  });

  useEffect(() => {
    console.log("user profile use effect currentMix = ", state.currentMix)
    API.getAllMixes(state.user._id)
      .then(result => {
        setMixes({
          mixes: result.data
        })
      })
  }, [state.currentMix])

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [showPic, setShowPic] = useState(false);
  const handleClosePic = () => setShowPic(false);
  const handleShowPic = () => setShowPic(true);

  const handleAddAbout = (e) => {
    e.preventDefault();
    let data = {
      id: state.user._id,
      about: e.target.about.value,
    };

    API.addAbout(data).then((result) => {
      console.log("result in add about = ", result.data);
      dispatch({
        type: UPDATE_USER,
        user: result.data,
      });
      setShowAdd(false);
    });
  };

  const handleEditAbout = (e) => {
    e.preventDefault();
    let data = {
      id: state.user._id,
      about: e.target.about.value,
    };
    API.addAbout(data).then((result) => {
      console.log("result inside handle edit about .then = ", result.data);
      dispatch({
        type: UPDATE_USER,
        user: result.data,
      });
      setShowEdit(false);
    });
  };

  const handleChangePicture = (e) => {
    e.preventDefault();
    console.log("e target - ", URL.createObjectURL(e.target.files[0]));
    //let image = e.target.picture.value.replace(/^C:\\fakepath\\/i, '');
    let body = {
      id: state.user._id,
      image: URL.createObjectURL(e.target.files[0]),
    };


    //console.log("image = ", image);
    API.changePicture(body)
      .then((res) => {
        console.log("result inside the change picture func = ", res.data);
        dispatch({
          type: UPDATE_USER,
          user: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChangeMix = (e) => {
    let mixId = e.target.value;
    API.getOneMix(mixId)
      .then(result => {
        console.log("result inside get one mix = ", result.data)
        dispatch({
          type: CURRENT_MIX,
          mix: [...result.data.mixArr]
        })
      })
  };

  return (
    <div className="container profile">
      <div className="row" >
        <div className="col-md-4 col-lg-4 col-sm-12"  id="connectionsBox">
          <div className="container userConnections">
            <div className="row "  id="connectionsBox">
              <h5 id="connectionsHeader">CONNECTIONS</h5>
            </div>
            <div className="row">
              {state.user.connections.length > 0 ? (
                state.user.connections.map((con) => {
                  return (
                    <Link to={"/artistprofile/" + con._id}>
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
                <div className="container" id="connectionsBox">
                  <h3  id="connectionsBox">NO CONNECTIONS</h3>
                </div>
              )}
            </div>

            <br />
            <div className="row"  id="connectionsBox">
              <Link to="/artists">
                <p id="browseArtist">
                  Browse Artists
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="row">
            <div className="container">
              <img
                src={state.user.image}
                width="50"
                height="50"
                alt={state.user.stageName}
                onClick={handleShowPic}
              />
              <ProfilePictureForm
                changePicture={handleChangePicture}
                handleClosePic={handleClosePic}
                showPic={showPic}
              />
              <h3 className="stage">{state.user.stageName}</h3>
              <p className="info">
                {" "}
                {state.user.genre} | {state.user.city}
              </p>
            </div>
          </div>
         
          <div className="row">
            {state.user.about ? (
              <>
                <p className="aboutInfo">{state.user.about}</p>
                <EditAbout
                  edit={handleEditAbout}
                  handleCloseEdit={handleCloseEdit}
                  showEdit={showEdit}
                  handleShowEdit={handleShowEdit}
                />
              </>
            ) : (
              <AddAbout
                add={handleAddAbout}
                handleCloseAdd={handleCloseAdd}
                handleShowAdd={handleShowAdd}
                showAdd={showAdd}
              />
            )}
          </div>
          <div className="row">
              <label htmlFor="mizes" className="inputLabel">
                SEQUENCES
              </label>
              <select
                className="form-select"
                id="mixesSelection"
                name="mixes"
                onChange={handleChangeMix}
              >
                <option selected disabled value="">Select a Sequence</option>
                {mixes.mixes
                  ? mixes.mixes.map((mix) => {
                      return (
                        <option value={mix._id}>{mix.name}</option>
                      );
                    })
                  : null}
              </select>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12" id="messagesBox">
          <div className="container userMessages" >
            <div className="row" id="connectionsBox">
              <h5 id="messagesHeader">MESSAGES</h5>
            </div>
            <div className="row" >
              {state.user.messages.length > 0 ? (
                state.user.messages.map((mess) => {
                  return (
                    <div id="messagesBox">
                      <img 
                        src={mess.image}
                        width="35"
                        height="35"
                        alt={mess.user}
                      />
                      <p style={{ fontSize: "10px" }}>{mess.message}</p>
                    </div>
                  );
                })
              ) : (
                <div id="messagesBox">
                  <h6 id="messagesBox">NO MESSAGES</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
