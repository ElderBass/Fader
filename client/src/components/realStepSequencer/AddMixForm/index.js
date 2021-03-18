import React from 'react';
import { Modal } from "react-bootstrap";

import './addmix.css'


const AddMixForm = (props) => {


return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title id="title">Fresh Track.</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={props.addMix}>
        <div className="form-group">
          <label id="title" htmlFor="mixName">Mix Name</label>
          <input
            type="text"
            className="form-control"
            id="mixName"
            name="mixName"
          />
        </div>
        <Modal.Footer>
          <button
            className="btn btn-default"
            type="submit"
            id="submitButton"
          >
            Save Mix
          </button>
        </Modal.Footer>
      </form>
    </Modal.Body>
  </Modal>

);
}


export default AddMixForm;