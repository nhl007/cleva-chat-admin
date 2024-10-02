type TRoomListResp = {
  room: string;
  lastMessage: string;
  lastMessageDate: string;
}[];

type TGetAllMessagesByRoom = {
  date: string | null;
  id: string;
  room: string;
  sender: string;
  admin: boolean;
  message: string;
}[];
