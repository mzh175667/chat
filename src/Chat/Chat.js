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
  const [allUsers, setAllUsers] = useState(null);
  const [followUsers, setFollowUsers] = useState(null);
  const [stateForFollowers, setStateForFollowers] = useState(false);
  const [arrivalNotificaationToFollowers, setArrivalNotificaationToFollowers] =
    useState("");
  const [forSeen, setForSeen] = useState(null);

  const socket = io.connect("ws://localhost:5000");
  console.log("followUsers=>", followUsers);
  //  user_id
  const id = localStorage.getItem("userId");
  useEffect(() => {
    console.log(user?.name);
    if (user) {
      setTimeout(() => {
        if (!user?.name) {
          navigate("/signin");
          alert("sorry you are not register");
        }
      }, 3000);
    }
  }, []);
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
      console.log("conversationData", conversationData);
      setArrivalConversation(conversationData.user);
    });
  }, []);
  useEffect(() => {
    socket.on("getNotificationForFollowers", (senderName) => {
      setArrivalNotificaationToFollowers(senderName);
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
      console.log("user", user);
      // console.log("users", users);
      setChatOnline(users);
      // console.log(chatOnline);
    });
  }, [id]);
  // console.log("chatOnline", chatOnline);

  useEffect(() => {
    socket.on("getDataForSeen", (data) => {
      console.log("data=====>", data);
      setForSeen({
        forSeen: data?.forSeen,
      });
    });
  });
  // console.log(forSeen);
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
    setArrivalNotificaationToFollowers("");
  };
  // for read more data
  const ReadMore = () => {
    setMaxLength((prev) => prev + 20);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user`);
        console.log("res", res?.data?.userData);
        setAllUsers(res?.data?.userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);
  useEffect(() => {
    const getFollowedUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/following/${id}`
        );
        setFollowUsers(res?.data?.friend?.following);
        // console.log("res=====================>", followUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowedUsers();
  }, [currentChat]);
  // console.log(conversation);
  // filter method

  const showFollowUsers = () => {
    setStateForFollowers(true);
  };
  const goBack = () => {
    setStateForFollowers(false);
  };

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
            {notification || arrivalNotificaationToFollowers ? (
              <>
                <div
                  className="chatNotificationBadge dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></div>
                <ul className="dropdown-menu mainul">
                  {/* {notificationUser.map((item) => ( */}

                  <li className="mainDropdown">
                    <div className="mainForHeaderIcons">
                      <i
                        className="fas fa-arrow-left icony"
                        onClick={createClnversationWithNotification}
                      ></i>
                      <i
                        className="fas fa-times iconx"
                        onClick={HideNotification}
                      ></i>
                    </div>
                    <div className="dropdown-item notification">
                      {notificationUser?.name
                        ? notificationUser?.name
                        : arrivalNotificaationToFollowers?.senderName}
                      {arrivalNotificaationToFollowers ? (
                        <p>follows yourself</p>
                      ) : null}

                      <div className="notificationMsg">
                        {notification ? (
                          <>
                            {notification?.msg.substring(0, maxLength)}
                            {notification?.msg.length > maxLength ? "..." : ""}
                          </>
                        ) : null}
                      </div>
                    </div>

                    {/* <li className="divider"></li> */}
                    {/* <div className="notificationFooter">
                      {notification && notification?.msg.length > maxLength ? (
                        <span
                          onClick={createClnversationWithNotification}
                          className="pl-3"
                        >
                          // Read more
                        </span>
                      ) : (
                        <h6></h6>
                      )}
                    </div> */}
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
                    onlineUser={chatOnline}
                    allConversations={conversation}
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
                        socket={socket}
                        forSeen={forSeen}
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
            {!stateForFollowers ? (
              followUsers != null ? (
                <>
                  <span className="FriendsText">Friends</span>
                  {followUsers.map((user, i) => (
                    <div key={i}>
                      <ChatOnline
                        chatOnline={chatOnline}
                        id={id}
                        socket={socket}
                        users={user}
                        follow={true}
                        conversation={conversation}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <span className="noOnlineUser">Follow Someone</span>
              )
            ) : allUsers ? (
              <>
                <div className="ForAboutUsers">
                  <i
                    className="fas fa-arrow-left iconForUser"
                    onClick={goBack}
                  ></i>
                  <span className="UsersText pr-3">User</span>
                </div>
                {allUsers.map((user, i) => (
                  <div key={i}>
                    <ChatOnline
                      chatOnline={chatOnline}
                      id={id}
                      socket={socket}
                      users={user}
                      follow={false}
                      conversation={conversation}
                    />
                  </div>
                ))}
              </>
            ) : (
              <span className="noOnlineUser">here is no user</span>
            )}
          </div>
          <div className="bottomTabForAboutUsers" onClick={showFollowUsers}>
            <i className="fas fa-user  bottomIcon"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
