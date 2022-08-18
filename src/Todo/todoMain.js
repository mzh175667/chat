import React from "react";
import Todo from "./todo";
import "../App.css";

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-12"></div>
        <div className="col-md-4 col-12">
          <Todo />
        </div>
        <div className="col-md-4 col-12"></div>
      </div>
    </div>
  );
};
export default App;
