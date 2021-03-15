import React from 'react';
import { Modal } from "react-bootstrap";

import './style.css'


const ProfilePictureForm = (props) => {


return (
    // <div className='buttons fadein'>
    // <div className='button'>
    //   <label htmlFor='single'>
    //     <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
    //   </label>
    //   <input type='file' id='single' onChange={props.onChange} /> 
    // </div>

    <Modal show={props.showPic} onHide={props.handleClosePic}>
        <Modal.Header closeButton>
          <Modal.Title>Let's Hear It</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form

            onSubmit={props.changePicture}
          >
            <div className="form-group">
              <label htmlFor="picture">Branding.</label>
              <input
                type="file"
                className="form-control"
                id="changePicture"
                name="picture"
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