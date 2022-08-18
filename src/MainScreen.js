import React from "react";
import "./App.css";
import Screen1 from "./screens/screen1";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";
import Comments from "./screens/screen_comments";
import Quotes from "./screens/quotes";

const App = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <Screen2 />
          </div>
          <div className="col-md-4 col-12">
            <Quotes />
          </div>
          <div className="col-md-4 col-12">
            <Screen1 />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
