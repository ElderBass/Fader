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

  // useEffect(() => {
  //   // console.log("state.user in user profile = ", state.user);
  //   console.log("state.current mix in user profile");
  //   dispatch({
  //     type: CURRENT_MIX,
  //     mix: mixes.mixes
  //   })
  // }, [mixes]);

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
    // const formData = new FormData();

    // formData.append("id", state.user.id);
    // formData.append("image", e.target.picture.value);
    let pic = {
      id: state.user._id,
      image: e.target.picture.value,
    };

    API.changePicture(pic)
      .then((res) => {
        console.log("result inside the change picture func = ", res);
        dispatch({
          type: UPDATE_USER,
          user: { ...state.user, image: res.data },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChangeMix = (e) => {
    let mixId = e.target.value; //this is just [object Object and not sure why]
    console.log("mix inside handleChange Mix = ", mixId)

    API.getOneMix(mixId)
      .then(result => {
        console.log("result inside get one mix = ", result.data)
        dispatch({
          type: CURRENT_MIX,
          mix: [...result.data.mixArr]
        })
        console.log(state.currentMix)
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
                alt={state.user.stagename}
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
         
          <div className="row" id="stage">
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
          <div className="row" id="mixesSelection">
              <label htmlFor="mixes" className="inputLabel">
                SEQUENCES
              </label>
              <select
                className="form-select"
                id="mixesSelection"
                name="mixes"
                onChange={handleChangeMix}
                // value={currentMix}
              >
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
