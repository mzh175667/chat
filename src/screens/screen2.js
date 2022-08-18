import React from "react";
import "../App.css";
const App = () => {
  return (
    <div className="app row">
      <div className="col-md-12 header">
        <div className="header_txt">November 12</div>
      </div>
      <div className="dates col-md-12">
        <div className="dates_item col-md-2">
          <h3>10</h3>
          <p>Sun</p>
        </div>
        <div className="dates_item col-md-2">
          <h3>11</h3>
          <p>Mon</p>
        </div>
        <div className="dates_item_main col-md-2">
          <h3>12</h3>
          <p>Tue</p>
        </div>
        <div className="dates_item col-md-2">
          <h3>13</h3>
          <p>Wed</p>
        </div>
        <div className="dates_item col-md-2">
          <h3>15</h3>
          <p>Thu</p>
        </div>
      </div>
      <div className="col-md-12 timings">
        <div className="col-md-3 col-3">
          <p className="sidebar_timing">8 AM</p>
          <p className="sidebar_timing mt-4 pt-2">9 AM</p>
          <p className="sidebar_timing mt-4 pt-2">10 AM</p>
          <p className="sidebar_timing mt-4 pt-2">11 AM</p>
          <p className="sidebar_timing mt-4 pt-2">12 PM</p>
          <p className="sidebar_timing mt-4 pt-2">1 PM</p>
          <p className="sidebar_timing mt-4 pt-2">2 PM</p>
          <p className="sidebar_timing mt-4 pt-2">3 PM</p>
          <p className="sidebar_timing mt-4 pt-2">4 PM</p>
        </div>
        <div className="col-md-9 col-9">
          <hr className="line" />
          <div className="messages_about_timing py-2 text-center">
            <span className="message_text">Meeting with PR Department</span>
            <hr className="line" />
          </div>
          <hr className="line" />

          <div className="mt-4 pt-4">
            <hr className="line" />
            <div className="messages_about_timing_2  py-2 text-center">
              <span className="message_text">Meeting with PR Department</span>
              <hr className="line" />
            </div>
            <hr className="line" />
          </div>
          <div className="messages_about_planning  py-3 text-center">
            <span className="message_text">Meeting with PR Department</span>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <button className="footer_button">Save</button>
      </div>
    </div>
  );
};
export default App;
