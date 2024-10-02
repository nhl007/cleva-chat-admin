"use client";

import socket from "@/utils/socket";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

function MessageLayout({ children }: PropsWithChildren) {
  const [isConnected, setIsConnected] = useState(false);

  const [roomList, setRoomList] = useState<TRoomListResp>([]);

  function onConnect() {
    setIsConnected(true);
    socket.emit("chatStart", {
      name: "Admin",
      email: "admin@gmail.com",
      admin: true,
      id: 5,
      image: "",
    });
  }

  const onUpdateRoomList = (data: string) => {
    const rooms: TRoomListResp = JSON.parse(data);
    console.log(rooms);
    setRoomList(rooms);
  };

  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("room_list", onUpdateRoomList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("room_list", onUpdateRoomList);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar  */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header  */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Cleva</h1>
        </header>

        {/* Contact List  */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {roomList.map((room) => (
            <Contacted
              key={room.room}
              name={room.room}
              image="/no-image.png"
              recentMessage={room.lastMessage}
            />
          ))}
        </div>
      </div>
      {isConnected ? (
        children
      ) : (
        <p className=" m-auto text-3xl font-bold "> Disconnected!</p>
      )}
    </div>
  );
}

type ContactedProps = {
  image: string;
  name: string;
  recentMessage: string;
};

const Contacted = ({ image, name, recentMessage }: ContactedProps) => {
  return (
    <Link
      href={`/msg/${name}`}
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <Image
          width={48}
          height={48}
          src={image}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{recentMessage}</p>
      </div>
    </Link>
  );
};

export default MessageLayout;
