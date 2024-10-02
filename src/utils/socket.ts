"use client";

import { io } from "socket.io-client";

const URL = "http://192.168.0.101:3001";

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
