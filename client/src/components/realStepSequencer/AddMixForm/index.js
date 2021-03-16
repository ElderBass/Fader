import React from 'react';
import { Modal } from "react-bootstrap";

import './addmix.css'


const AddMixForm = (props) => {


return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Fresh Track.</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={props.addMix}>
        <div className="form-group">
          <label htmlFor="mixName">Mix Name</label>
          <input
            type="text"
            className="form-control"
            id="mixName"
            name="mixName"
          />
        </div>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={props.handleClose}>
            Close
          </button>
          <button
            className="btn btn-default"
            type="submit"
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