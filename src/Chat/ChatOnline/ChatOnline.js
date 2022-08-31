import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const ChatOnline = ({
  chatOnline,
  id,
  socket,
  users,
  follow,
  conversation,
}) => {
  const navigate = useNavigate();
  console.log("users=================>", conversation);

  // var conversations = conversation?.members[1];
  const [followedUser, setFollowedUser] = useState("");
  const [loading, setLoading] = useState(null);
  const [keyForOnline, setKeyForOnline] = useState(false);
  const [keyForCreatingConversation, setKeyForCreatingConversation] =
    useState(false);
  const onlineUserId = chatOnline?.userId;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");
  // console.log(token);
  // console.log(users?._id);
  useEffect(() => {
    conversation.map((item) => {
      item?.members.map((item) => {
        if (item[1] === users?._id || item[0] === users?._id) {
          setKeyForCreatingConversation(true);
        }
      });
    });
  }, [conversation]);
  useEffect(() => {
    chatOnline.map((item) => {
      // console.log("item", item?.userId, "users?._id", users?._id);
      if (item?.userId === users?._id) {
        setKeyForOnline(true);
      }
    });
  }, [chatOnline]);
  // console.log("chatOnline", chatOnline);

  const createConversation = async (receiverId, name) => {
    if (!follow) {
      alert(
        `sorry bro, please follow ${name} to create conversation with ${name}`
      );
    } else {
      const conversation = {
        senderId: id,
        receiverId: receiverId,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/conversation",
          conversation
        );
        console.log("ressssssss", res);
        socket.emit("sendConversation", {
          user: res?.data,
          senderId: id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFollowedUserData = async (receiverId) => {
    if (follow) {
      var body = {
        unFollowId: receiverId,
      };
    } else {
      var body = {
        followId: receiverId,
      };
    }
    console.log("receiverId", receiverId);
    setLoading(true);
    await fetch(
      follow
        ? "http://localhost:5000/users/unfollow"
        : "http://localhost:5000/users/follow",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.message == "unauthorized") {
          navigate("/signin");
          alert("sorry you are unauthorized");
        }
        if (res?.success == true) {
          let followedPersonId = res?.result?.following.pop();
          socket.emit("sendNotificationForFollowers", {
            senderName: res?.result?.name,
            receiverId: followedPersonId,
          });
          if (follow) {
            navigate("/loading...");
          }
          console.log(res);
          // alert(`are you sure to follow the ${res?.result?.name}`);
          setLoading(false);
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const forConversationAlert = (name) => {
    alert(`You have already create the conversation with ${name}`);
  };
  return (
    <>
      <div className="chatOnline">
        {
          // conversations?.members[1] !== onlineUserId ? (
          id != users?._id ? (
            users?.name ? (
              <div className="mainForOnlineUser">
                <div
                  className="chatOnlineFriend"
                  data-coreui-toggle="modal"
                  data-coreui-target="#exampleModal"
                  onClick={() => {
                    keyForCreatingConversation
                      ? createConversation(users?._id, users?.name)
                      : forConversationAlert(users?.name);
                  }}
                >
                  <div className="chatOnlineImgContainer">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiWoq9EpegXraZkSw81CAR6D0SdHM6e11OQ&usqp=CAU"
                      alt=""
                      className="chatOnlineImg"
                    />
                    {keyForOnline ? (
                      <div className="chatOnlineBadge"></div>
                    ) : null}
                  </div>
                  <span className="chatOnlineName">{users?.name}</span>
                </div>
                <span
                  className="followText ml-2"
                  onClick={() => handleFollowedUserData(users?._id)}
                >
                  {follow ? "unFollow" : "Follow"}
                  {follow ? (
                    <i className="fas fa-user-check ml-2"></i>
                  ) : (
                    <i className="fas fa-user ml-2"></i>
                  )}
                </span>
              </div>
            ) : null
          ) : null
          // ) : null
        }
      </div>
      <Modal
        size="md"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to create conversation with{" "}
          {/* {onlineUser?.data?.friend?.name} */}
          <h1>sjdbnlkkdzv nkl</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createConversation}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatOnline;
