import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useUserContext } from "../../../utils/UserState";
import "./style.css";

const EditAbout = (props) => {
  const [state, dispatch] = useUserContext();

  const [about, editAboutState] = useState({
    about: state.user.about,
  });

  const handleEditChange = (e) => {
    e.preventDefault();
    console.log("changing inside handle edit change = ", e.target)
    editAboutState({
      about: e.target.value,
    });
  };

  return (
    <>
      <i
        id="editAboutBtn"
        onClick={props.handleShowEdit}
        className="fas fa-pencil-alt icon"
      />
      <Modal show={props.showEdit} onHide={props.handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Remix.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={props.edit}>
            <div className="form-group">
              <label htmlFor="about">Not Feeling That Vibe?</label>
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
              <button className="btn btn-default" type="submit">
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
