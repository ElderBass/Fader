import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useUserContext } from "../../../utils/UserState";
import "./style.css";
import cog from "../../../assets/images/cog.png";

const EditAbout = (props) => {
  const [state, dispatch] = useUserContext();

  const [about, editAboutState] = useState({
    about: state.user.about,
  });

  const handleEditChange = (e) => {
    e.preventDefault();

    editAboutState({
      about: e.target.value,
    });
  };

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
          <form onSubmit={props.edit}>
            <div className="form-group">
              <label id="title" htmlFor="about">Not Feeling That Vibe?</label>
              <input
                placeholder={state.user.about}
                onChange={handleEditChange}
                type="text"
                className="form-control"
                id="editAbout"
                name="about"
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
