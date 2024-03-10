import React, { useState, useEffect, FormEvent, useRef } from "react";
import styled from "styled-components";
import { IconRoute } from "../components/FooterBar";
import { useSocket } from "../stores/useSocket";
import { useLogin } from "../stores/useLogin";
import { useNavigate, useParams } from "react-router-dom";
import { createRoomId } from "../utils/createRoomId";
import { getChatRoomName } from "../utils/getChatRoomName";
import api from "../apis/api";

function PrivateChat() {
  const navigator = useNavigate();
  const { id: toUserId } = useParams();
  const { currentSocket: socket } = useSocket();
  const [messages, setMessages] = useState([""]);
  const { id, name } = useLogin();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [roomName, setRoomName] = useState("");
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
        if (res.data.data.room.chats !== null) {
          setMessages(res.data.data.room.chats);
        }
        setRoomName(getChatRoomName(res.data.data.room.name, name));
        scrollToBottom();
      });
    if (socket) {
      socket.on("sendMessage", (data: string) => {
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
    navigator(-1);
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
      <RoomHeader>
        <BackArrow src={IconRoute("back-arrow")} width={48} height={48} alt="back-icon" onClick={moveBack} />
        <span>{roomName}</span>
      </RoomHeader>
      <ChatBox ref={scrollRef}>
        {messages.map((message, index) => (
          <MessageBox className={message[0] === id ? "sender" : "receiver"} key={index}>
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

const Wrapper = styled.div`
  padding-top: 60px;
`;

const BackArrow = styled.img`
  position: absolute;
  left: 0px;
`;

const RoomHeader = styled.div`
  width: 393px;
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  background-color: #5e5e5e;
  color: white;
  font-weight: 700;
  justify-content: center;
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
  background-color: white;
  border: 1px solid #434343;
  border-radius: 0px 0px 10px 10px;
  img {
    cursor: pointer;
  }
  button {
    width: 48px;
    height: 48px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  border: none;
  padding: 0px 10px 0px 10px;
`;

const ChatBox = styled.div`
  width: 100%;
  height: calc(100vh - 117px);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: #434343;
  animation: 1s ease-in;
  &::-webkit-scrollbar {
  display: none;
  box-sizing: border-box;
}
`;

const MessageBox = styled.div`
  display: inline-block;
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin: 5px;
  word-wrap: break-word;
  &.sender {
    align-self: flex-end;
    background-color: #a5c9ff;
  }

  &.receiver {
    align-self: flex-start;
    background-color: #bbbbbb;
  }
`;
