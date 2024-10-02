"use client";

import socket from "@/utils/socket";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const { user } = useParams();

  const ref = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<TGetAllMessagesByRoom>([]);

  const [messageText, setMessageText] = useState("");

  const onRoomJoin = async (msgs: string) => {
    const parsed: TGetAllMessagesByRoom = JSON.parse(msgs);
    setMessages(parsed);
  };

  const onReceiveMessage = async (msg: TGetAllMessagesByRoom[0]) => {
    console.log(msg);
    setMessages((prev) => [...prev, msg]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("message", {
      room: user,
      message: messageText,
      admin: true,
      sender: "5",
    });

    setMessages((prev) => [
      ...prev,
      {
        room: user as string,
        message: messageText,
        admin: true,
        sender: "5",
        id: "5",
        date: "ss",
      },
    ]);

    setMessageText(() => "");

    ref.current?.scroll({
      top: ref.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    socket.emit("joinRoom", {
      room: user,
    });

    socket.on("joined_room", onRoomJoin);
    socket.on("message", onReceiveMessage);

    return () => {
      socket.off("joined_room", onRoomJoin);
      socket.off("message", onReceiveMessage);
    };
  }, []);

  return (
    <div className="flex-1">
      {/* Chat Header  */}
      <header className="bg-white p-4 text-gray-700">
        <h1 className="text-2xl font-semibold">{user}</h1>
      </header>

      {/* Chat Messages  */}
      <div ref={ref} className="h-screen overflow-y-auto p-4 pb-48">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            outgoing={msg.admin}
            image={msg.admin ? "/cleva_icon.png" : "/no-image.png"}
            message={msg.message}
          />
        ))}
      </div>

      {/* Chat Input  */}
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <form onSubmit={onSubmit} className="flex items-center">
          <input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

type MessageProps = {
  outgoing?: boolean;
  image: string;
  message: string;
};

const Message = ({ outgoing = false, image, message }: MessageProps) => {
  return (
    <div
      className={cn(
        "flex order-1 mb-4 cursor-pointer",
        outgoing && "justify-end"
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center mr-2",
          outgoing && "order-2 ml-2"
        )}
      >
        <Image
          width={48}
          height={48}
          src={image}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div
        className={cn(
          "flex order-2 max-w-96 bg-white rounded-lg p-3 gap-3",
          outgoing && "order-1 bg-indigo-500"
        )}
      >
        <p className={cn("text-gray-700", outgoing && "text-white")}>
          {message}
        </p>
      </div>
    </div>
  );
};
