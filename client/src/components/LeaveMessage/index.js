import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./style.css";

const LeaveMessage = (props) => {
  return (
    <>
      <Button id="messageBtn" variant="primary" onClick={props.handleShow}>
        Message
      </Button>

      <Modal id="customModal" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="title">Let's Hear It</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form

            onSubmit={props.handleLeaveMessage}
          >
            <div className="form-group">
              <label id="title" htmlFor="message">What's the Word?</label>
              <input
                type="text"
                className="form-control"
                id="leaveMessage"
                name="message"
              />
            </div>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={props.handleClose}>
                Close
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                // onClick={props.handleLeaveMessage}
              >
                Post Message
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeaveMessage;
