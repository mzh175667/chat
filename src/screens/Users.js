import React, { useEffect, useState } from "react";
import { Get_USER_DATA } from "../Reducers/DataReducers";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

const Users = () => {
  const { loading, users } = useSelector((state) => state.userData);
  console.log("Data --->", users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_USER_DATA());
  }, []);
  return (
    <div className="apps pt-4">
      {users?.map((item) => (
        <div className="col-md-12 mt-4">
          <h2>
            <span className=" mr-4 pr-4">{item?.id}</span>
            {item?.name} &nbsp;&nbsp; {item?.email}&nbsp;&nbsp; {item?.website}
            &nbsp;&nbsp;
            {item?.address.city}
          </h2>
        </div>
      ))}
    </div>
  );
};
export default Users;
