import React, { useEffect, useState } from "react";
import "./ChatMessages.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatMessages = ({ message, own, socket }) => {
  const [forSeen, setForSeen] = useState(null);
  // const { forSeen } = useSelector((state) => state.chat);
  // console.log("inSelecter", forSeen);
  const [maxLength, setMaxLength] = useState(600);
  socket.on("getDataForSeen", (data) => {
    console.log(data);
    // setForSeen({
    //   forSeen: data?.forSeen,
    // });
  });
  console.log("for", forSeen);
  const ReadMore = () => {
    setMaxLength((prev) => prev + 600);
  };
  return (
    <div className={own ? "messages own" : "messages"}>
      <div className="messagesTop">
        <img
          className="messagesImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiWoq9EpegXraZkSw81CAR6D0SdHM6e11OQ&usqp=CAU"
          alt=""
        />
        <p className="messagesText">
          <span>
            {message?.text.substring(0, maxLength)}
            {message?.text.length > maxLength ? (
              <>
                ...
                <span
                  onClick={ReadMore}
                  className={own ? "readMoreText own" : "readMoreText "}
                >
                  Read more
                </span>
              </>
            ) : (
              ""
            )}
          </span>
          {/* {forSeen.seen ? <i className="fas fa-circle seenText"></i> : null} */}
        </p>
      </div>
      <div className="messagesBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default ChatMessages;
