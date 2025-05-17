import { io } from "socket.io-client";
import { BASE_URL } from "./constants";  // Ensure BASE_URL is properly defined

export const createSocketConnection = () => {
    console.log("Creating socket connection...");
    return io(BASE_URL,  + "/api",{
        withCredentials: true,  // Optional: add this if you're using credentials like cookies or authentication
        transports: ['websocket'],  // Optional: Ensure WebSocket is used
    });
};
