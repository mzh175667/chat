import React, { useState } from "react";
import "../App.css";
import TodoList from "./todoList";

const Todo = () => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);

  const handleInputList = () => {
    setItems((items) => {
      return [...items, inputList];
    });
    setInputList("");
    console.log(items);
  };
  const deleteItems = (id) => {
    setItems((oldItems) => {
      return oldItems.filter((arrElemennt, index) => {
        return id !== index;
      });
    });
  };
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="upper-txt mt-5 p-3">
            <span className="main-txt">Todo</span>
          </div>
          <div className="col-md-12">
            <div className="main_input mt-4 ">
              <span className="name_signUp mt-4 mt-4 pt-5">
                <input
                  type="text"
                  placeholder="enter your products"
                  className="inputs"
                  onChange={(e) => setInputList(e.target.value)}
                  value={inputList}
                />
              </span>{" "}
              <button
                className="participant_add mr-2 btn"
                onClick={handleInputList}
              >
                +
              </button>
            </div>
            <ol className="r">
              {items.map((itemsVal, index) => {
                return (
                  <TodoList
                    key={index}
                    id={index}
                    onSelect={deleteItems}
                    texts={itemsVal}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
