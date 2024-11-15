import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const Messages = (id) => {
  const [messenger, setMessenger] = useState([]);
  const [message, setMessage] = useState({
    name: '',
    email: '',
    message: '',
    userID: id.id,
    sender: 'me',
  });

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/profile/${id.id}`, {
          method: 'GET',
          headers: {
            authorization: "Bearer " + id.token,
          },
        });

        const data = await response.json();

        if (data.length > 0) {
          setMessage((prevMessage) => ({
            ...prevMessage,
            name: data[0].name,
            email: data[0].email,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    userProfile();
  }, [id.id, id.token]);

  useEffect(() => {
    const allMessage = async () => {
      try {
        const response = await fetch(`http://localhost:8000/allmessage/${id.id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const datas = await response.json();
        setMessenger(datas);
      } catch (error) {
        console.log(error);
      }
    };

    allMessage();

    // Listening for incoming messages from the server
    socket.on("message", (data) => {
      if (data.userID === id.id && data.sender !== 'me') { 
        setMessenger((prev) => [...prev, { sender: data.sender, message: data.message }]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [id.id]);

  const mg = (value, type) => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      [type]: value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/messageUser`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return console.log("Have A Problem");

      setMessenger((prev) => [
        ...prev,
        { sender: message.sender, message: message.message },
      ]);

      setMessage((prev) => ({ ...prev, message: '' }));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    mg,
    HandleSubmit,
    message,
    messenger,
  };
};

export default Messages;
