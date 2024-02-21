import React, { useState } from "react";
import styled from "styled-components";
import { IconRoute } from "../components/FooterBar";
import { useNavigate } from "react-router-dom";
import { FooterType } from "./Main";

function PrivateChat({onItemClick}: { onItemClick: (item: FooterType) => void }) {
  const moveBack = () => {
    onItemClick("chat")
  }
  const sendChat = () => {
    console.log(chat);
  }
  const [chat, setChat] = useState("");
  return (
    <Wrapper>
      <RoomHeader>
        <img src={IconRoute("back-arrow")} width={48} height={48} alt="back-icon" onClick={moveBack}/>
        <span>이승현</span>
      </RoomHeader>
      <SendBar>
        <Input value={chat} onChange={(e)=>setChat(e.target.value)}/>
        <img src={IconRoute("send")} width={48} height={48} alt="send-icon" onClick={sendChat}/>
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
