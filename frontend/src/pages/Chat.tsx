import React, { useEffect, useState } from "react";
import { Background } from "./SignUp";
import FooterBar from "../components/FooterBar";
import api from "../apis/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../stores/useLogin";

interface RoomInfoProps {
  users: [string];
  _id: string;
  name: string;
  roomId: string;
  lastChat: string;
  timeOfLastChat: number;
}

function getOppId(my_id: string, room_id: string) {
  let split_room_id = room_id.split("_");
  split_room_id = split_room_id.filter((item: string) => item !== my_id);
  console.log(split_room_id);
  return split_room_id.pop();
}

function Chat() {
  const navigator = useNavigate();
  const { id } = useLogin();
  const [roomInfos, setRoomInfos] = useState<[RoomInfoProps]>([
    {
      users: [""],
      _id: "",
      name: "",
      roomId: "",
      lastChat: "",
      timeOfLastChat: Date.now(),
    },
  ]);
  useEffect(() => {
    api
      .get("/users/myChatsInfo", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      .then(res => setRoomInfos(res.data.data.roomInfos))
      .catch(err => console.log(err));
  }, []);

  const ChatBoxes = roomInfos.map(room => (
    <ChatBox onClick={() => navigator(`/chat/${getOppId(id, room.roomId)}`)}>
      {room.lastChat}
      {room.timeOfLastChat}
    </ChatBox>
  ));
  return (
    <Background>
      {ChatBoxes}
      <FooterBar />
    </Background>
  );
}

export default Chat;

const ChatBox = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;
