import React from 'react';
import { Modal } from "react-bootstrap";

import './style.css'


const ProfilePictureForm = (props) => {


return (

    <Modal show={props.showPic} onHide={props.handleClosePic}>
        <Modal.Header closeButton>
          <Modal.Title>Let's Hear It</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form

            
          >
            <div className="form-group">
              <label htmlFor="picture">Branding.</label>
              <input
                type="file"
                className="form-control"
                id="changePicture"
                name="picture"
                onChange={props.changePicture}
              />
            </div>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={props.handleClosePic}>
                Close
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                // onClick={props.handleLeaveMessage}
              >
                Save Changes
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>


);
}


export default ProfilePictureForm;