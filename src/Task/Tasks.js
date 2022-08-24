import React, { useEffect, useState } from "react";
import ClassComponents from "../ClassComponents/ClassComponents";
import arr from "./Array";
import minAge from "./minAge";
import multanData from "./multanData";
import userZul from "./userZul";
import averageData from "./average";
import "./task.css";
const Task = () => {
  const [user, setUser] = useState(false);
  const [userFilterData, setUserFilterData] = useState("");
  console.log("arr=====>", arr);

  //  Remove Lahorians
  const RemoveLahorians = () => {
    var data = arr.filter((person) => person.city != "Lahore");
    setUser(true);
    setUserFilterData(data);
    console.log(data);
  };
  const Function = () => {
    var a = "zulki";
    var a = "phulki";
    const data = "x";
    // data = "y";
    console.log(data);
  };
  console.log(a);

  Function();

  {
    var a = "by";
  }
  console.log("block ==>>", a);

  return (
    <div className="App">
      <h1>Task of saqlain sir</h1>
      <table className="tables">
        <tbody>
          <tr>
            <th className="headings">id</th>
            <th className="headings">Name</th>
            <th className="headings">Age</th>
            <th className="headings">Age(month)</th>
            <th className="headings">City</th>
            <th className="headings">Persons in multan</th>
            <th className="headings">user Zul</th>
            <th className="headings">youngest</th>
            <th className="headings">Average</th>
          </tr>
          <tr>
            <td className="texts">
              {arr.map((item, i) => (
                <h2 key={i}>{item.id}</h2>
              ))}
            </td>
            <td className="texts">
              {arr.map((item, i) => (
                <h2 key={i}>{item.name}</h2>
              ))}
            </td>
            <td className="texts">
              {arr.map((item, i) => (
                <h2 key={i}>{item.age}</h2>
              ))}
            </td>
            <td className="texts">
              {arr.map((item, i) => (
                <h2 key={i}>{item.age * 12}</h2>
              ))}
            </td>
            <td className="texts">
              {arr.map((item, i) => (
                <h2 key={i}>{item.city}</h2>
              ))}
            </td>
            <td className="texts">
              {multanData.map((item, i) => (
                <h2 key={i}>{item.name}</h2>
              ))}
            </td>
            <td className="texts">
              {userZul.map((item, i) => (
                <h2 key={i}>{item.name}</h2>
              ))}
            </td>
            <td className="texts">
              <h2>{minAge}</h2>
            </td>
            <td className="texts">
              <h2>{averageData}</h2>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="footer_button_table mt-4"
        onClick={() => RemoveLahorians()}
      >
        Remove Lahorians
      </button>
      <ClassComponents />
      {user ? (
        <table className="tables">
          <tbody>
            <tr>
              <th className="headings">id</th>
              <th className="headings">Name</th>
              <th className="headings">Age</th>
              <th className="headings">Age(month)</th>
              <th className="headings">City</th>
            </tr>
            <tr>
              <td className="texts">
                {userFilterData.map((item) => (
                  <h2>{item.id}</h2>
                ))}
              </td>
              <td className="texts">
                {userFilterData.map((item) => (
                  <h2>{item.name}</h2>
                ))}
              </td>
              <td className="texts">
                {userFilterData.map((item) => (
                  <h2>{item.age}</h2>
                ))}
              </td>
              <td className="texts">
                {userFilterData.map((item) => (
                  <h2>{item.age * 12}</h2>
                ))}
              </td>
              <td className="texts">
                {userFilterData.map((item) => (
                  <h2>{item.city}</h2>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};
export default Task;
