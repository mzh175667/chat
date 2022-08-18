import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/chat");
  }, []);
  return <Chat />;
};

export default Loading;
