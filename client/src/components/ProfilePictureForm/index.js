import React from "react";
import { Modal } from "react-bootstrap";

import "./style.css";

const ProfilePictureForm = (props) => {
  return (
    <Modal id="customModal" show={props.showPic} onHide={props.handleClosePic}>
      <Modal.Header closeButton>
        <Modal.Title id="title">Profile Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.changePicture}>
          <div className="form-group">
            <label id="title" htmlFor="picture">
              Branding is Everything.
            </label>
            <input
              type="text"
              className="form-control"
              id="changePicture"
              name="picture"
              placeholder="Enter a url from the internet - square 400x400 are ideal."
            />
          </div>
          <Modal.Footer>
            <button id="submitButton" className="btn btn-default" type="submit">
              Save Photo
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfilePictureForm;
