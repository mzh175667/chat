import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import img1 from "../images/p1.jpg";
import img2 from "../images/p2.jpeg";
import img3 from "../images/p3.jpeg";
import img4 from "../images/p4.jpeg";
const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Largest = () => {
    var array = [3, 6, 2, 56, 32, 5, 89, 32];
    var largest = array[0];
    for (let i = 0; i <= array.length; i++) {
      if (largest < array[i]) {
        largest = array[i];
      }
    }
    console.log(largest);
  };
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-md-12 header">
            <div className="header_txt text-center">
              {/* <span className="icon1"><i className="fas fa-angle-left"></i></span> */}
              Edit
            </div>
          </div>
          <div className="col-md-12">
            <div className="upper_text mb-4 ">
              Meeting with PR Department
              <span className="icon3">
                <i className="fas fa-pen"></i>
              </span>
              <hr className="line" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="upper_text2  mb-4">
              <span className="icon2 text-center">
                <i className="fas fa-calendar-alt"></i>
              </span>
              Monday,12 November
              <span className="icon4">
                <i className="fas fa-pen"></i>
              </span>
              <hr className="line" />
            </div>
          </div>
          <div className="timings mb-0">
            <div className="col-md-5 col-sm-5 col-lg-5 col-5 timing_txt">
              <span className="timing_icon">
                <i className="far fa-clock"></i>
              </span>
              8 AM
              <hr className="line" />
            </div>
            <div className="col-md-1 col-1 text-center mt-2 mid_dash">-</div>
            <div className="col-md-5 col-sm-5 col-lg-5 col-5 timing_txt">
              <span className="timing_icon text-center">
                <i className="far fa-clock"></i>
              </span>
              10 AM
              <hr className="line" />
            </div>
          </div>
          <div className="col-md-12 card_main_div">
            <div className="card cards">
              <div className="card-body card_txt">
                <span className="work_icon text-center">
                  <i className="fas fa-shopping-bag"></i>
                </span>
                Work
                <span className="forward_icon text-center">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card cards">
              <div className="card-body card_txt">
                <span className="reminder_icon text-center">
                  <i className="fas fa-bell"></i>
                </span>
                Reminder
                <span className="forward_icon text-center">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12 col">
            <div className="participants_txt">Participants</div>
            <div className="participants">
              <img src={img1} alt="" className="participant_person mr-2" />
              <img src={img2} alt="" className="participant_person mr-2" />
              <img src={img3} alt="" className="participant_person mr-2" />
              <img src={img4} alt="" className="participant_person mr-2" />
              <span className="participant_add mr-2 ">+</span>
            </div>
          </div>
          <div className="col-md-12 col-12">
            <button className="footer_button" onClick={handleShow}>
              Save
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default App;
