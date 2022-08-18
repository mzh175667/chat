import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ChatModal = ({ show, createConversation, handleClose, name }) => {
  return (
    // <div>
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to create conversation with{name}
        <h1>sjdbnlkkdzv nkl</h1>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createConversation}>
          ok
        </Button>
      </Modal.Footer>
    </Modal>
    // </div>
  );
};

export default ChatModal;
