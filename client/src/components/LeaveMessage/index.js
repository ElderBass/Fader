import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./style.css";

const LeaveMessage = (props) => {
  return (
    <>
      <Button variant="primary" onClick={props.handleShow}>
        Leave Message
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let's Hear It</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form

            onSubmit={props.handleLeaveMessage}
          >
            <div className="form-group">
              <label htmlFor="message">Email address</label>
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