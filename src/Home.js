import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import mainForHome from "./assets/mainImgForHome.png";
function Home() {
  const id = localStorage.getItem("userId");
  console.log(id);
  const token = localStorage.getItem("token");
  // console.log(token);
  //...(spead operator)  kisi bhi aik value ko spread ker ky multiple arguements ma convert kr deta hai
  return (
    <div>
      <div className="mainForHome">
        <img src={mainForHome} className="chatMainHomeImg pb-3 pl-3" />
      </div>

      <Link to={id === null ? "/signin" : "./chat"} className="mainForFooter">
        <button className="footer_button_for_home">Enter Here</button>
      </Link>
      <div className="startChatText">Start Chat</div>
    </div>
  );
}

export default Home;
