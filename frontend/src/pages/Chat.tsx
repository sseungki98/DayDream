import React, { useEffect, useState } from "react";
import { Background } from "./SignUp";
import FooterBar from "../components/FooterBar";
import api from "../apis/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../stores/useLogin";
import { stringParser } from "../utils/stringParser";
import { getChatRoomName } from "../utils/getChatRoomName";

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

function calcDateDiff(chatTime: number) {
  const chatDate: Date = new Date(chatTime);
  const nowDate: Date = new Date();
  const timeDifference: number = nowDate.getTime() - chatDate.getTime();
  const differenceInHours: number = Number((timeDifference / (1000 * 60)).toFixed(0));
  if (differenceInHours < 60) {
    if (differenceInHours === 0) {
      return "방금 전";
    } else {
      return differenceInHours + "분 전";
    }
  } else if (differenceInHours < 60 * 24) {
    const hour = Math.floor(differenceInHours / 60);
    return `${hour}시간 전`;
  } else {
    const day = (differenceInHours / 60) * 24;
    return day + "일 전";
  }
}

function Chat() {
  const navigator = useNavigate();
  const { id, name } = useLogin();
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
      .then(res => {
        const roomInfo = res.data.data.roomInfos;
        const sorted_room_info = roomInfo.sort((a: any, b: any) => a.timeOfLastChat < b.timeOfLastChat ? 1 : -1);
        console.log(sorted_room_info);
        setRoomInfos(sorted_room_info);
      })
      .catch(err => console.log(err));
  }, []);

  const ChatBoxes = roomInfos.map(
    room =>
      room.lastChat && (
        <ChatBox onClick={() => navigator(`/chat/${getOppId(id, room.roomId)}`)}>
          <div className="leftbox">
            <Image src={process.env.PUBLIC_URL + "/img/user-default-icon.svg"} />
            <ChatText>
              <p className="name">{getChatRoomName(room.name, name)}</p>
              <p className="text">{stringParser(18, room.lastChat)}</p>
            </ChatText>
          </div>
          <LastChatTime>{calcDateDiff(room.timeOfLastChat)}</LastChatTime>
        </ChatBox>
      ),
  );
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
  border-bottom: 1px solid black;
  align-items: center;
  justify-content: space-between;
  background-color: #bbbbbb;
  cursor: pointer;
  .leftbox {
    display: flex;
    align-items: center;
  }
`;

const Image = styled.img`
  margin: 0px 10px 0px 10px;
  width: 60px;
  height: 60px;
`;
const ChatText = styled.div`
  p {
    margin: 8px 0px 8px 0px;
  }
  .name {
    font-weight: 700;
  }
`;

const LastChatTime = styled.div`
  margin-right: 10px;
`;
