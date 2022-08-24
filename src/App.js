import React from "react";
import "./App.css";
import Screen from "./MainScreen";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Task from "./Task/Tasks";
import SignIn from "./Authentication/signIn";
import SignUp from "./Authentication/signUp";
import Todo from "./Todo/todoMain";
import Users from "./screens/Users";
import Chat from "./Chat/Chat";
import Loading from "./Chat/Loading";
const App = () => {
  const user = localStorage.getItem("userId");
  console.log(user);
  const token = localStorage.getItem("token");
  // console.log(token);
  return (
    <div>
      <Routes>
        <Route path="/screen" element={<Screen />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/task" element={<Task />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/loading..." element={<Loading />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
export default App;
