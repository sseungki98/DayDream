import React, { useState, useEffect, FormEvent, useRef } from "react";
import styled from "styled-components";
import { IconRoute } from "../components/FooterBar";
import { FooterType } from "./Main";
import { ConnectionState } from "../components/ConnectionState";
import { Events } from "../components/Events";
import { ConnectionManager } from "../components/ConnectionManager";
import { useSocket } from "../stores/useSocket";
import { useLogin } from "../stores/useLogin";
import { useNavigate, useParams } from "react-router-dom";
import { createRoomId } from "../utils/createRoomId";
import api from "../apis/api";

// { onItemClick }: { onItemClick: (item: FooterType) => void }
function PrivateChat() {
  const navigator = useNavigate();
  const { id: toUserId } = useParams();
  const { currentSocket: socket } = useSocket();
  const [messages, setMessages] = useState([""]);
  const { id } = useLogin();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const roomId = createRoomId(id, toUserId!);
    api
      .get(`/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      .then(res => {
        console.log(res);
        setMessages(res.data.data.room.chats);
        console.log(messages);
        scrollToBottom();
      });
    if (socket) {
      socket.on("sendMessage", (data: string) => {
        console.log("messagedata:", data);
        setMessages(prev => [...prev, data]);
      });
    }
    return () => {
      socket!.off("sendMessage");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const moveBack = () => {
    navigator("/chat");
  };

  const [chat, setChat] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && chat.trim()) {
      socket.emit("sendMessage", { sender: id, receiver: toUserId, message: chat });
    }
    setChat("");
  };

  return (
    <Wrapper>
      <ConnectionManager />
      <RoomHeader>
        <img src={IconRoute("back-arrow")} width={48} height={48} alt="back-icon" onClick={moveBack} />
        <span>이승현</span>
      </RoomHeader>
      <ChatBox ref={scrollRef}>
        {messages.map((message, index) => (
          <MessageBox key={index} position={message[0] === id ? "right" : "left"}>
            {message[1]}
          </MessageBox>
        ))}
      </ChatBox>
      <SendBar onSubmit={handleSubmit}>
        <Input value={chat} onChange={e => setChat(e.target.value)} />
        <button type="submit">
          <img src={IconRoute("send")} width={48} height={48} alt="send-icon" />
        </button>
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

const SendBar = styled.form`
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
  button {
    width: 48px;
    height: 48px;
    border: none;
    background-color: transparent;
    display: inline-block;
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

const ChatBox = styled.div`
  width: 100%;
  height: 600px;
  overflow: scroll;
  background: linear-gradient(180deg, #b1a8ff, #ffb580);
  animation: 1s ease-in;
`;

const MessageBox = styled.div<{ position: string }>`
  width: 80%;
  height: 35px;
  border: 1px solid black;
  margin: 3px 0px 3px 0px;
  float: ${props => props.position};
`;
