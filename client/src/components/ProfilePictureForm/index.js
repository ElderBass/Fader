import React from 'react';
import { Modal } from "react-bootstrap";

import './style.css'


const ProfilePictureForm = (props) => {


return (

    <Modal show={props.showPic} onHide={props.handleClosePic}>
        <Modal.Header closeButton id="testingmafucka">
          <Modal.Title id="title">Profile Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={props.changePicture}          
          >
            <div className="form-group">
              <label id="title" htmlFor="picture">Enter a url from the internet - square 400x400 are ideal.</label>
              <input 
                type="text"
                className="form-control"
                id="changePicture"
                name="picture"
              />
            </div>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                type="submit"
              >
                Save Photo
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>


);
}


export default ProfilePictureForm;