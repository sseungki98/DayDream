import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconRoute } from "../components/FooterBar";
import { FooterType } from "./Main";
import { ConnectionState } from "../components/ConnectionState";
import { Events } from "../components/Events";
import { ConnectionManager } from "../components/ConnectionManager";
import { useSocket } from "../stores/useSocket";
import { useLogin } from "../stores/useLogin";
import { useNavigate, useParams } from "react-router-dom";

// { onItemClick }: { onItemClick: (item: FooterType) => void }
function PrivateChat() {
  const navigator = useNavigate();
  const { id: toUserId } = useParams();
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([""]);
  const { currentSocket: socket } = useSocket();
  const { id } = useLogin();
  useEffect(() => {
    function onFooEvent(value: string) {
      setFooEvents(previous => [...previous, value]);
    }

    if (socket) {
      socket.on("foo", onFooEvent);
    }
  }, []);

  const moveBack = () => {
    navigator("/chat");
  };

  const [chat, setChat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.MouseEvent) {
    event.preventDefault();
    console.log(socket);
    // console.log(chat);
    setIsLoading(true);

    socket!.emit("reply", { to: toUserId, message: chat });
  }

  return (
    <Wrapper>
      <Events events={fooEvents} />
      <ConnectionManager />
      <RoomHeader>
        <img src={IconRoute("back-arrow")} width={48} height={48} alt="back-icon" onClick={moveBack} />
        <span>이승현</span>
      </RoomHeader>
      <SendBar>
        <Input value={chat} onChange={e => setChat(e.target.value)} />
        <img src={IconRoute("send")} width={48} height={48} alt="send-icon" onClick={e => onSubmit(e)} />
      </SendBar>
    </Wrapper>
  );
}

export default PrivateChat;

const Wrapper = styled.div``;

const RoomHeader = styled.div`
  width: 393px;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: azure;
  display: flex;
  align-items: center;
  text-align: center;
  img {
    cursor: pointer;
  }
`;

const SendBar = styled.div`
  width: 393px;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
  position: fixed;
  bottom: 70px;
  img {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
