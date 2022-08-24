import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Conversation.css";
import { UPDATE_SEEN_MESSAGE } from "../../Reducers/ChatReducers";
import { useDispatch, useSelector } from "react-redux";

const Conversation = ({
  conversation,
  currentUser,
  messages,
  socket,
  chatOnline,
}) => {
  const { forSeen } = useSelector((state) => state.chat);
  console.log(forSeen);
  const dispatch = useDispatch();
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

  const UpdateSeenRequest = async (id, receiverId) => {
    console.log("forSeen.seen", forSeen.seen);
    dispatch(UPDATE_SEEN_MESSAGE(id));
    dispatch(UPDATE_SEEN_MESSAGE(id));
    socket.emit("sendDataForSeen", {
      receiverId: receiverId,
      forSeen: forSeen.seen,
    });
  };
  // console.log("conversation", conversation);
  return (
    <div
      className={
        conversation && conversation?._id === messages[0]?.conversationId
          ? "SelectedConverstaion"
          : "Converstaion"
      }
      onClick={() =>
        UpdateSeenRequest(conversation?._id, conversation?.members[1])
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
