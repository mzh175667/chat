import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios"
import { Get_Data_Quotes } from "../Reducers/DataReducers";
import image from "../images/product.png";
import img1 from "../images/p1.jpg";
import img2 from "../images/p2.jpeg";
import img3 from "../images/p3.jpeg";
import img4 from "../images/p4.jpeg";
const App = () => {
  const dispatch = useDispatch();
  const { quotes, loading } = useSelector((state) => state.userData);
  console.log("quotesData=>", quotes);
  // const [quote, setQuote] = useState("")
  // const getQuotes = () =>{
  //   axios.get("https://api.quotable.io/random")
  //   .then((res) => {
  //       setQuote(res)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  // const arr = [10,1,7,9,57,89,77]
  const GetQuotes = () => {
    dispatch(Get_Data_Quotes());
  };

  if (loading) {
    return <h3>loading...</h3>;
  }
  return (
    <div className="app">
      <div className="col-md-12 ">
        <div className="quotesData">
          <h3 className="mt-4 pt-4">{quotes?.data?.author}</h3>
          <h5 className="qoutes mt-2 pt-2">{quotes?.data?.content}</h5>
        </div>
        <button className="footer_button_quotes mt-4" onClick={GetQuotes}>
          Save
        </button>
        <img src={image} alt="" className="images" />
        <div className="participants_txt">Participants</div>
        <div className="participants">
          <img src={img1} alt="" className="participant_person mr-2" />
          <img src={img2} alt="" className="participant_person mr-2" />
          <img src={img3} alt="" className="participant_person mr-2" />
          <img src={img4} alt="" className="participant_person mr-2" />
          <span className="participant_add mr-2 ">+</span>
        </div>
      </div>
    </div>
  );
};
export default App;
