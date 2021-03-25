import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useUserContext } from "../../../utils/UserState";
import "./style.css";
import cog from "../../../assets/images/cog.png";

const EditAbout = (props) => {
  const [state, dispatch] = useUserContext();

  const [userInfo, editUserState] = useState({
    about: state.user.about,
    stageName: state.user.stageName
  });

  useEffect(() => {
    editUserState({
      about: state.user.about,
      stageName: state.user.stageName
    })
  }, [state.user])

  const handleEditAboutInfo = (e) => {
    e.preventDefault();

    editUserState({
      ...userInfo,
      about: e.target.value,
    });
  };

  const handleEditStageName = (e) => {
    e.preventDefault();
    editUserState({
      ...userInfo,
      stageName: e.target.value
    })
  }

  return (
    <>
      <img src={cog}
        id="editAboutBtn"
        onClick={props.handleShowEdit}
      />
      <Modal id="customModal" show={props.showEdit} onHide={props.handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title id="title">Remix.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={props.edit} className="needs-validation">
            <div className="form-group">
              <label id="title" htmlFor="about">You've Changed.</label>
              <input
                placeholder={state.user.about}
                onChange={handleEditAboutInfo}
                type="text"
                className="form-control"
                id="editInput"
                name="about"
                required
              />
              <br/>
              <label id="title" htmlFor="about">Alter Ego...?</label>
              <input 
              placeholder={state.user.stageName}
              // value={state.user.stageName}
              onChange={handleEditStageName}
              type="text"
              className="form-control"
              id="editInput"
              name="stageName" 
              required
              />
            </div>
            <Modal.Footer>
              <button id="submitButton" className="btn btn-default" type="submit">
                Edit Info
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditAbout;
