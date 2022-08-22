import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ChatOnline = ({ users, id, socket, conversation }) => {
  var conversations = conversation[0];
  const [followedUser, setFollowedUser] = useState("");
  const [onlineUser, setOnlineUser] = useState(null);
  const [loading, setLoading] = useState(null);
  for (let i = 0; i <= conversation.length; i++) {
    conversations = conversation[i];
    // console.log(conversations?.members[1]);
  }
  const onlineUserId = users?.userId;
  const [show, setShow] = useState(false);
  // const friendId = users?.conversation?.members.find((m) => m !== id);
  // console.log(friendId);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    if (onlineUserId !== undefined) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/user/${onlineUserId}`
          );
          setOnlineUser(res);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [users]);
  const createConversation = async () => {
    const conversation = {
      senderId: id,
      receiverId: onlineUserId,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/conversation",
        conversation
      );
      console.log(res);
      if (res) {
        alert(
          `are you sure to create a conversation with ${onlineUser?.data?.friend?.name}`
        );
      }
      socket.emit("sendConversation", {
        user: res?.data,
        senderId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollowedUserData = async () => {
    setLoading(true);
    await fetch("http://localhost:5000/users/follow", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        followId: onlineUserId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success == true) {
          let followedPersonId = res?.result?.following.pop();
          socket.emit("sendNotificationForFollowers", {
            senderName: res?.result?.name,
            receiverId: followedPersonId,
          });
          alert(`are you sure to follow the ${res?.result?.name}`);
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="chatOnline">
        {conversations?.members[1] !== onlineUserId ? (
          onlineUser ? (
            id !== onlineUserId ? (
              onlineUser?.data?.friend?.name ? (
                <div className="mainForOnlineUser">
                  <div
                    className="chatOnlineFriend"
                    data-coreui-toggle="modal"
                    data-coreui-target="#exampleModal"
                    onClick={createConversation}
                  >
                    <div className="chatOnlineImgContainer">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUiWoq9EpegXraZkSw81CAR6D0SdHM6e11OQ&usqp=CAU"
                        alt=""
                        className="chatOnlineImg"
                      />
                      <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">
                      {onlineUser?.data?.friend?.name}
                    </span>
                  </div>
                  <span
                    className="followText ml-2"
                    onClick={!loading ? handleFollowedUserData : null}
                  >
                    Follow
                    {/* <i className="fas fa-user-check ml-2"></i> */}
                    <i className="fas fa-user ml-2"></i>
                  </span>
                </div>
              ) : null
            ) : null
          ) : (
            <span className="noOnlineUser">no one was online</span>
          )
        ) : null}
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
          {onlineUser?.data?.friend?.name}
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
