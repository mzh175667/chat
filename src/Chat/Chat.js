import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Conversation from "./Conversation/Conversation";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatOnline from "./ChatOnline/ChatOnline";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat = () => {
  const scrollRef = useRef();
  const navigate = useNavigate();

  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [arrivalConversation, setArrivalConversation] = useState(null);
  const [chatOnline, setChatOnline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationUser, setNotificationUser] = useState([]);
  const [user, setUser] = useState("");
  const [maxLength, setMaxLength] = useState(25);
  const [searchBar, setSearchBar] = useState("");
  const socket = io.connect("ws://localhost:5000");

  //  user_id
  const id = localStorage.getItem("userId");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);

  //   if (!token) {
  //     navigate("/");
  //   }
  // }, []);
  // including socket.io
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessages({
        sender: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    socket.on("getConversation", (conversationData) => {
      setArrivalConversation(conversationData.user);
    });
  }, []);
  useEffect(() => {
    socket.on("getNotification", (notifications) => {
      setNotification({
        msg: notifications?.msg,
        senderId: notifications?.senderId,
        conversationId: notifications?.conversationId,
        createdAt: notifications?.createdAt,
      });
      const getNotificationUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:5000/user/${notifications.senderId}`
          );
          setNotificationUser(res?.data?.friend);
          console.log(notificationUser);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getNotificationUser();
    });
  });
  useEffect(() => {
    setConversation((prev) => [...prev, arrivalConversation]);
  }, [arrivalConversation]);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    socket.emit("addUser", id);
    socket.on("getUsers", (users) => {
      setChatOnline(users);
      // console.log(chatOnline);
    });
  }, [id]);

  // fetching api's....

  // getting conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/conversation/${id}`);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [id]);

  // getting user
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${id}`);
        setUser(res?.data?.friend);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [id]);

  // getting messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // create messages
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      text: newMessages,
      sender: id,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat.members.find((member) => member != id);
    console.log("receiverId", receiverId);
    socket.emit("sendmessages", {
      senderId: id,
      receiverId,
      text: newMessages,
    });
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/messages", message);
      setMessages([...messages, res.data]);
      socket.emit("sendNotification", {
        receiverId: receiverId,
        senderId: res?.data?.sender,
        conversationId: res?.data?.conversationId,
        msg: res.data.text,
        createdAt: res?.createdAt,
      });
      setNewMessages("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const createClnversationWithNotification = () => {
    navigate("/loading...");
    setNotification("");
  };
  // set Notifications
  const HideNotification = () => {
    setNotification("");
  };
  // for read more data
  const ReadMore = () => {
    setMaxLength((prev) => prev + 20);
  };
  // for getting following users

  // filter method
  const handleFilterData = () => {};
  console.log(conversation);
  return (
    <>
      <div className="top_bar">
        <div>
          <img
            className="conversationImg  mt-3 pb-3 pl-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiWoq9EpegXraZkSw81CAR6D0SdHM6e11OQ&usqp=CAU"
            alt=""
          />
          <span className="topName">{user?.name}</span>
        </div>
        <span className="top">
          <div className="chatConversationContainer">
            <i className="fas fa-bell  icons mr-3"></i>
            {notification ? (
              <>
                <div
                  className="chatConversationBadge dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></div>
                <ul className="dropdown-menu">
                  {/* {notificationUser.map((item) => ( */}

                  <li className="mainDropdown">
                    <i
                      className="fas fa-times iconx"
                      onClick={HideNotification}
                    ></i>
                    <div className="dropdown-item notification">
                      {notificationUser?.name}
                      <div className="notificationMsg">
                        {`${notification?.msg.substring(0, maxLength)}`}
                        {notification?.msg.length > maxLength ? "..." : ""}
                      </div>
                      {/* <span className="formatDate">
                        {format(notification.createdAt)}
                      </span> */}
                    </div>

                    <li className="divider"></li>
                    <div className="notificationFooter">
                      {notification?.msg.length > maxLength ? (
                        <span onClick={ReadMore} className="pl-3">
                          // Read more
                        </span>
                      ) : (
                        <h6></h6>
                      )}
                      <i
                        className="fas fa-arrow-right iconx"
                        onClick={createClnversationWithNotification}
                      ></i>
                    </div>
                  </li>
                  {/* ))} */}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </span>
      </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="searchBarDiv">
              <input
                placeholder="Search for friends"
                className="chatMenuInput"
                onChange={(e) => setSearchBar(e.target.value)}
              />
              <i
                className="fas fa-search searchIcon"
                // onClick={() => FilterData()}
              ></i>
            </div>
            {conversation ? (
              conversation.map((c, i) => (
                <div onClick={() => setCurrentChat(c)} key={i}>
                  <Conversation
                    conversation={c}
                    currentUser={id}
                    messages={messages}
                    socket={socket}
                    users={chatOnline}
                  />
                </div>
              ))
            ) : (
              <div className="noConversationText">No conversation here..</div>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div ref={scrollRef} key={i}>
                      <ChatMessages
                        message={m}
                        own={m.sender === id ? true : false}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageTextInput"
                    placeholder="Type a message"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit}
                  ></textarea>

                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                    disabled={loading || newMessages === "" ? true : false}
                  >
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noChat">open a conversation to start chat.</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {chatOnline.map((user, i) => (
              <div key={i}>
                <ChatOnline
                  users={user}
                  id={id}
                  socket={socket}
                  conversation={conversation}
                />
              </div>
            ))}
          </div>
          <div className="bottomTabForAboutUsers">
            <i className="fas fa-user  bottomIcon"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;