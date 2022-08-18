import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Conversation.css";

const Conversation = ({
  conversation,
  currentUser,
  messages,
  socket,
  chatOnline,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser);
    if (friendId !== undefined) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:5000/user/${friendId}`);
          setUser(res?.data?.friend);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [conversation, currentUser]);
  useEffect(() => {
    socket.emit("showingLastMessage", {
      conversation,
    });
  }, [currentUser]);
  useEffect(() => {
    socket.on("getLastMessage", (data) => {});
  }, [currentUser]);
  console.log(conversation?.lastMessage);
  return (
    <div
      className={
        conversation && conversation?._id === messages[0]?.conversationId
          ? "SelectedConverstaion"
          : "Converstaion"
      }
    >
      <>
        <img
          className="conversationImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiWoq9EpegXraZkSw81CAR6D0SdHM6e11OQ&usqp=CAU"
          alt=""
        />
        <div className="conversationUser">
          <span className="conversationText">
            {!loading ? user?.name : "..."}
          </span>
          {/* {conversation._id === lastMessage?.data?.conversationId ? ( */}
          <div className="lastMessage">
            {conversation?.lastMessage
              ? conversation?.lastMessage.substring(0, 40)
              : "..."}
            {conversation?.lastMessage
              ? conversation?.lastMessage.length > 40
                ? "..."
                : ""
              : "..."}
          </div>
          {/* ) : (
              ""
            )} */}
        </div>
      </>
    </div>
  );
};

export default Conversation;
