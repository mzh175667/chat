import React from "react";
import "../App.css";
const TodoList = (props) => {
  return (
    <li className="li_text">
      {props.texts}
      <span
        className="delete mr-4"
        onClick={() => {
          props.onSelect(props.id);
        }}
      >
        <span className="icon2 text-center">
          <i className="fas fa-trash"></i>
        </span>
      </span>
    </li>
  );
};

export default TodoList;
