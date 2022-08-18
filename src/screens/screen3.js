import React, { useEffect, useState } from "react";
import { Get_Data } from "../Reducers/DataReducers";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

const Screen3 = () => {
  const { loading, data } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Data());
  }, []);
  return (
    <div className="apps">
      {data?.map((item) => (
        <div className="col-md-12">
          <h2>
            <span className=" mr-4 pr-4">{item?.id}</span>
            {item?.title}
          </h2>
        </div>
      ))}
    </div>
  );
};
export default Screen3;
