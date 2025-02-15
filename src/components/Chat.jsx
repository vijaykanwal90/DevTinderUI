// import { createSocketConnection } from "@/socket";
// import { createSocket } from "dgram";
import React from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import { m } from "framer-motion";
const Chat = () => {
    const user = useSelector((store) => store.user);
    const [messages,setMessages] = useState([])
    const [newMessage,setnewMessage]= useState('')
    const {targetUserId }= useParams();
    // console.log(targetUserId)
    const userId = user?._id;
    useEffect(() => {
        if(!userId){
            return ;
        }
        const socket = createSocketConnection();
        console.log("joining chat")
        // console.log(socket)
        socket.emit("joinChat",{
          firstName:user.firstName,
          userId,
          targetUserId
        })
        socket.on("messageReceived",({firstName,text})=>{
          // console.log( " :  " + text)
      // setMessages((messages)=>[...messages,{newMessage}])
      // console.log(firstName + " " + "is sending message",text)
    
      // setMessages((prevMessages) => [...prevMessages, text]);
      // setMessages([...messages,{firstName,text}])
      setMessages((prevMessages) => [...prevMessages, {firstName, text}]);

      // console.log(messages)

      // console.log("afte message",message)

      })
        return ()=>{
            socket.disconnect()
        }
    },[targetUserId,userId])
    const sendMessage = ()=>{
        const socket =createSocketConnection();
        socket.emit("sendMessage",{
          firstName:user.firstName,
          userId,
          targetUserId,
          text:newMessage})
        // console.log(newMessage)
        
        setnewMessage('')
    }
  return (
    <div className="w-3/4 flex justify-center items-center mx-auto my-4">
      <div className="flex flex-col justify-between border-2 bg-black text-white p-4 rounded-lg h-[500px] w-[500px]">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="">
            <img
              src="https://i3.wp.com/cdn.zeebiz.com/sites/default/files/2022/11/05/209096-virat-kohli-7-pti.jpg?strip=all"
              alt="User Image"
              className="w-10 h-10 bg-white rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg">Vijay Kanwal</h2>
        </div>

        {/* Divider */}
        <hr className="border-gray-600" />

        {/* Message Box */}
       
       
           
          
          {messages.map((msg,index)=>{
            return (
            <div key={index} className={`bg-gray-700 w-3/4 p-2 rounded-lg flex flex-col ${msg.firstName !== user.firstName ? 'self-start' : 'self-end'}`}>
              
            <h3 className="font-semibold">{msg.firstName}</h3>
            <p className="">{msg.text}</p>
          </div> 
            )
          })}
      

        {/* Input Section */}
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e)=>{
                setnewMessage(e.target.value)
            }}
            className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white outline-none"
          />
          <button onClick={sendMessage} className="bg-blue-600 p-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
