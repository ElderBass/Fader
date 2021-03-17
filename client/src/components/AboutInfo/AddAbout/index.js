import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./style.css";

const AddAbout = (props) => {
  return (
    <>
      <Button className="btn-default" onClick={props.handleShowAdd}>
        ADD BIO
      </Button>
      <Modal show={props.showAdd} onHide={props.handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Encore.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={props.add}>
            <div className="form-group">
              <label htmlFor="about">Who Are You Even?</label>
              <input
                type="text"
                className="form-control"
                id="addAbout"
                name="about"
              />
            </div>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={props.handleCloseAdd}>
                Close
              </button>
              <button
                className="btn btn-default"
                type="submit"
              >
                Add Info
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAbout;
