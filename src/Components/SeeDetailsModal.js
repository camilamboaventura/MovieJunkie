import React from "react";
import { Modal, Button } from "react-bootstrap";

const style = {
  backgroundColor: "#141414",
  color: "white",
};

function SeeDetailsModal(props) {
  return (
    <Modal
      //   {...props}
      //   className="modal"
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={style}>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.currentlySelected.name
            ? props.currentlySelected.name
            : props.currentlySelected.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={style}>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer style={style}>
        <Button name="toWatch" onClick={props.handleButtonModal}>To Watch</Button>
        <Button name="waiting" onClick={props.handleButtonModal}>Waiting New Season</Button>
        <Button name="watched" onClick={props.handleButtonModal}>Already Watched</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SeeDetailsModal;
