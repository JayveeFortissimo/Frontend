import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://backend-production-62ff.up.railway.app");

const Answered = () => {
  const [clickedM, setClickedM] = useState(0);
  const userName = useRef('');
  const [allMessageUser, setAllmessage] = useState([]);
  const [usersMessages, setUsersMessages] = useState([]);

  const [message, setMessage] = useState({
    name: 'ADMIN***',
    email: 'ADMIN***',
    message: '',
    userID: clickedM,
    sender: 'admin',
  });

  const mg = (value, type) => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      [type]: value,
    }));
  };

  useEffect(() => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      userID: clickedM,
    }));
  }, [clickedM]);

  useEffect(() => {
    async function AllInquiries() {
      try {
        const response = await fetch(`https://backend-production-62ff.up.railway.app/alluser`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setAllmessage(data);

        if (!response.ok) return console.log("Have Probs");
      } catch (error) {
        console.log(error);
      }
    }

    AllInquiries();
  }, []);

  useEffect(() => {
    const allMessage = async () => {
      try {
        const response = await fetch(`https://backend-production-62ff.up.railway.app/allmessage/${clickedM}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const datas = await response.json();
        setUsersMessages(datas);
      } catch (error) {
        console.log(error);
      }
    };

    allMessage();

    // Listening for new messages via WebSocket
    socket.on("message", (data) => {
      if (data.userID === clickedM) {
        setUsersMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [clickedM]);

  const AnswerAdmin = async (e) => {
    e.preventDefault();
    if (clickedM === 0) {
      console.log("User not selected");
    } else {
      try {
        const response = await fetch(`https://backend-production-62ff.up.railway.app/messageUser`, {
          method: 'post',
          body: JSON.stringify(message),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) return console.log("Have Probs");

        // Emit the message after posting it successfully
        socket.emit("message", {
          userID: clickedM,
          sender: message.sender,
          message: message.message
        });

      } catch (error) {
        console.log(error);
      }
    }
  }

  return {
    allMessageUser,
    setClickedM,
    usersMessages,
    userName,
    mg,
    AnswerAdmin,
    message
  }
};

export default Answered;
