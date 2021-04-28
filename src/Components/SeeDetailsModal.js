import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const style = {
  backgroundColor: "#141414",
  color: "white",
};

function SeeDetailsModal(props) {
  return (
    <Modal
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
        {props.location !== "toWatchList" ? (
          <Button name="toWatch" onClick={props.handleButtonModal}>
            To Watch
          </Button>
        ) : null}
        {props.location !== "waitingNewSeasonList" ? (
          <Button name="waiting" onClick={props.handleButtonModal}>
            Waiting New Season
          </Button>
        ) : null}
        {props.location !== "watchedList" ? (
          <Button name="watched" onClick={props.handleButtonModal}>
            Already Watched
          </Button>
        ) : null}
        {props.location !== "searchSeries" &&
        props.location !== "searchMovies" ? (
          <Button name="delete" onClick={props.handleButtonModal}>
            Delete
          </Button>
        ) : null}
        {props.location === "searchMovies" ||
        props.location === "searchSeries" ? (
          <Link to={`/details/${props.location}/${props.currentlySelected.id}`}>
            <Button onClick={props.onHide}>More info</Button>
          </Link>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}

export default SeeDetailsModal;
