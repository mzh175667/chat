import React, { useState } from "react";
import "./ChatMessages.css";
import { format } from "timeago.js";
const ChatMessages = ({ message, own }) => {
  const [maxLength, setMaxLength] = useState(600);
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
        </p>
      </div>
      <div className="messagesBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default ChatMessages;
