import React from "react";
import { Modal, Button } from "react-bootstrap";

export function ModalCommon({ show, title, body, handleConfirm, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
