import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { createSocketConnection } from "../socket";
import { BASE_URL } from "../constants";

// 👇 Reuse socket across component
let socket;

const Chat = () => {
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverUser, setReceiverUser] = useState(null);
  const { targetUserId } = useParams();
  const userId = user?._id;
  const roomId = [userId, targetUserId].sort().join("_");
 
  // Fetch receiver details
  const fetchUserAndMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/chat/${targetUserId}`, {
        withCredentials: true,
      });
      setReceiverUser(res.data.user);
    } catch (error) {
      console.log("error is " + error.message);
    }
  };

  // Fetch previous messages
  const fetchMessages = async () => {
    try {
      const res2 = await axios.get(`${BASE_URL}/message/getMessage/${roomId}`, {
        withCredentials: true,
      });

      // Ensure each message has senderId and formatted time
      const formattedMessages = (res2.data.messages || []).map(msg => ({
        ...msg,
        senderId: msg.senderId || msg.userId || "", // fallback if needed
        time: msg.time
          ? new Date(msg.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      }));

      setMessages(formattedMessages);
    } catch (error) {
      // console.log("error is " + error.message);
    }
  };

  // Fetch messages when room changes
  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  // Fetch receiver user details
  useEffect(() => {
    fetchUserAndMessages();
  }, [targetUserId]);

  // Socket connection and listeners
  useEffect(() => {
    if (!userId) return;

    socket = createSocketConnection();

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
      time,
    });

    // Listen for incoming messages
    socket.on("messageReceived", ({ firstName, text, time, senderId }) => {
      // Ignore your own messages (already added locally)
      
      if (senderId.toString() === userId.toString()) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName,
          text,
          time: new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: senderId, // fallback if not provided
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const isoTime = now.toISOString();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
      time: isoTime,
      senderId: userId,
    });

    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        text: newMessage,
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderId: userId,
      },
    ]);

    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto my-4 px-2">
      <div className="flex flex-col justify-between border-2 bg-black text-white p-4 rounded-lg h-[80vh] max-h-[700px] w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => window.history.back()}
          />
          <img
            src={
              receiverUser?.profilePic ||
              "https://i3.wp.com/cdn.zeebiz.com/sites/default/files/2022/11/05/209096-virat-kohli-7-pti.jpg?strip=all"
            }
            alt="User"
            className="w-10 h-10 bg-white rounded-full object-cover"
          />
          <h2 className="font-semibold text-lg">
            {receiverUser ? receiverUser.firstName : "Loading..."}
          </h2>
        </div>

        {/* Divider */}
        <hr className="border-gray-600" />

        {/* Messages */}
        <div className="flex flex-col gap-2 overflow-y-auto flex-grow my-2 pr-1">
  {messages.map((msg) => (
    <div
      key={msg._id}  // Use unique message ID here
      className={`w-fit max-w-[80%] p-2 rounded-lg text-sm ${
        msg.senderId === userId
          ? "self-end bg-green-600"
          : "self-start bg-gray-700"
      }`}
    >
      <p>{msg.text}</p>
      <span className="text-xs text-gray-300 ml-2">{msg.time}</span>
    </div>
  ))}
</div>
          

        {/* Input Section */}
        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
