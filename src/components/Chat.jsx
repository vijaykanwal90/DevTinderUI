import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";
// Using lucide-react for consistent icons, but FaArrowLeft is fine too
import { ArrowLeft, SendHorizontal, Image as ImageIcon, AlertCircle } from "lucide-react";
import { createSocketConnection } from "../socket"; // Ensure this path is correct
import { BASE_URL } from "../constants"; // Ensure this path is correct

// 👇 Reuse socket across component
let socket;

// Placeholder for profile picture
const DEFAULT_PROFILE_PIC = "https://avatar.iran.liara.run/public";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverUser, setReceiverUser] = useState(null);
  const [isLoadingReceiver, setIsLoadingReceiver] = useState(true);
  const [errorReceiver, setErrorReceiver] = useState(null);
  const { targetUserId } = useParams();
  const navigate = useNavigate(); // For back navigation
  const userId = user?._id;
  const roomId = userId && targetUserId ? [userId, targetUserId].sort().join("_") : null;

  const messagesEndRef = useRef(null); // For scrolling to bottom

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // Fetch receiver details
  const fetchUserAndMessages = async () => {
    if (!targetUserId) return;
    setIsLoadingReceiver(true);
    setErrorReceiver(null);
    try {
      const res = await axios.get(`${BASE_URL}/user/chat/${targetUserId}`, {
        withCredentials: true,
      });
      setReceiverUser(res.data.user);
    } catch (error) {
      console.log("Error fetching receiver details: " + error.message);
      setErrorReceiver("Failed to load user details.");
    } finally {
      setIsLoadingReceiver(false);
    }
  };

  // Fetch previous messages
  const fetchMessages = async () => {
    if (!roomId) return;
    try {
      const res2 = await axios.get(`${BASE_URL}/message/getMessage/${roomId}`, {
        withCredentials: true,
      });
      const formattedMessages = (res2.data.messages || []).map(msg => ({
        ...msg,
        _id: msg._id || `local-${Date.now()}-${Math.random()}`, // Ensure _id for key
        senderId: msg.senderId || msg.userId || "",
        time: msg.time
          ? new Date(msg.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date().toLocaleTimeString([], { // Fallback time if msg.time is missing
              hour: "2-digit",
              minute: "2-digit",
            }),
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.log("Error fetching messages: " + error.message);
      // Optionally set an error state for messages
    }
  };

  // Fetch messages when room changes
  useEffect(() => {
    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);

  // Fetch receiver user details
  useEffect(() => {
    fetchUserAndMessages();
  }, [targetUserId]);

  // Socket connection and listeners
  useEffect(() => {
    if (!userId || !targetUserId) return; // Ensure both IDs are present

    // Disconnect previous socket if exists to prevent multiple listeners
    if (socket) {
        socket.disconnect();
    }
    socket = createSocketConnection();

    socket.emit("joinChat", { // user.firstName might be undefined initially
      firstName: user?.firstName || "User",
      userId,
      targetUserId,
      // time is not typically sent on join, but kept from original
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    socket.on("messageReceived", ({ firstName, text, time, senderId, _id: messageId }) => {
      if (senderId?.toString() === userId?.toString()) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: messageId || `socket-${Date.now()}-${Math.random()}`, // Ensure _id for key
          firstName,
          text,
          time: new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: senderId,
        },
      ]);
    });

    return () => {
      if (socket) {
        socket.off("messageReceived"); // Clean up specific listener
        socket.disconnect();
        socket = null; // Clear the socket variable
      }
    };
  }, [targetUserId, userId, user?.firstName]); // Added user.firstName as it's used in emit

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !userId || !targetUserId) return;

    const now = new Date();
    const isoTime = now.toISOString();
    const localMessageId = `local-${Date.now()}-${Math.random()}`; // Generate local ID

    socket.emit("sendMessage", {
      firstName: user?.firstName || "User",
      userId,
      targetUserId,
      text: newMessage,
      time: isoTime, // Send ISO time for server consistency
      senderId: userId,
    });

    setMessages((prev) => [
      ...prev,
      {
        _id: localMessageId, // Use local ID
        firstName: user?.firstName || "User",
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


  // Conditional rendering if user or targetUserId is missing
  if (!user || !userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-white">
        <p>Loading user data or user not authenticated...</p>
      </div>
    );
  }
  if (!targetUserId) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-white">
        <p>No target user specified for chat.</p>
      </div>
    );
  }


  return (
    // Main page container
    <div className="flex flex-col h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100">
      {/* Chat Window */}
      <div className="flex flex-col flex-grow w-full max-w-3xl mx-auto my-0 sm:my-4 md:my-6 shadow-2xl rounded-none sm:rounded-xl overflow-hidden">
        {/* Header (no changes here) */}
        <div className="flex items-center space-x-3 p-3 sm:p-4 bg-neutral-800 border-b border-neutral-700">
          {/* ... header content ... */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-neutral-700 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={22} className="text-neutral-300" />
          </button>
          {isLoadingReceiver ? (
            <div className="flex items-center space-x-3 animate-pulse">
                <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
                <div className="w-24 h-4 bg-neutral-700 rounded"></div>
            </div>
          ) : errorReceiver ? (
            <div className="flex items-center text-red-400">
                <AlertCircle size={20} className="mr-2"/> User unavailable
            </div>
          ) : receiverUser ? (
            <>
              <img
                src={receiverUser.photoUrl || receiverUser.profilePic || `${DEFAULT_PROFILE_PIC}?name=${receiverUser.firstName}+${receiverUser.lastName}`}
                alt={receiverUser.firstName || "User"}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-neutral-600"
              />
              <h2 className="font-semibold text-base sm:text-lg text-neutral-100 truncate">
                {receiverUser.firstName} {receiverUser.lastName}
              </h2>
            </>
          ) : (
            <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Messages Area - THIS IS THE CRITICAL CHANGE */}
        <div className="flex flex-col flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 bg-neutral-800/50 custom-scrollbar">
          {/* The parent div above now has `flex flex-col` */}
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex flex-col w-fit max-w-[75%] sm:max-w-[70%] rounded-xl px-3.5 py-2.5 ${
                // Ensure comparison is robust (e.g., convert to string if types might differ)
                String(msg.senderId) === String(userId)
                  ? "self-end bg-sky-600 text-white rounded-br-none" // SENDER
                  : "self-start bg-neutral-700 text-neutral-100 rounded-bl-none" // RECEIVER
              }`}
            >
              <p className="text-sm sm:text-base leading-snug whitespace-pre-wrap break-words">
                {msg.text}
              </p>
              <span className={`text-xs mt-1 self-end ${String(msg.senderId) === String(userId) ? 'text-sky-200' : 'text-neutral-400'}`}>
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* For scrolling to bottom */}
        </div>

        {/* Input Section (no changes here) */}
        <div className="p-3 sm:p-4 bg-neutral-800 border-t border-neutral-700">
          {/* ... input content ... */}
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2.5 sm:p-3 rounded-xl bg-neutral-700 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-sky-500 border border-transparent focus:border-sky-500 transition-shadow"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-2.5 sm:p-3 rounded-xl bg-sky-600 text-white hover:bg-sky-500 disabled:bg-sky-800 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
              aria-label="Send message"
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;