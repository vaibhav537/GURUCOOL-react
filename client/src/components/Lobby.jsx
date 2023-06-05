import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-slate-200">
      <h1 className="text-8xl font-Crimson mt-40">Lobby</h1>
      <form onSubmit={handleSubmitForm} className="mt-20">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-2xl">
            Email ID :
          </label>
          <input
            type="email"
            id="email"
            className="outline-none ring-2 ring-white rounded ml-2 pl-2 my-3 p-1 focus:ring-4 focus:ring-black  transition-all duration-500"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="room" className="text-2xl">
            Room Number :
          </label>
          <input
            type="text"
            id="room"
            className="outline-none ring-2 ring-white rounded ml-2  pl-2 my-3 p-1 focus:ring-4 focus:ring-black  transition-all duration-500"
            autoComplete="off"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button className="ml-14 mt-12 bg-white hover:bg-slate-300 hover:shadow-3xl hover:text-white rounded transition-all duration-500 p-2 text-2xl">
          Join
        </button>
      </form>
    </div>
  );
};

export default Lobby;
