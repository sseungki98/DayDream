import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";
import { Background } from "./SignUp";
import FooterBar from "../components/FooterBar";
import { useSocket } from "../stores/useSocket";
import { useLogin } from "../stores/useLogin";

interface UserInfo {
  _id: string;
  name: string;
  createdAt: Date;
  introduce: string;
  img: [string];
  age: number;
  height: number;
  weight: number;
}

function LookUp() {
  const navigator = useNavigate();
  const { currentSocket } = useSocket();
  const { id } = useLogin();
  const [todayUsers, setTodayUsers] = useState<[UserInfo]>([
    {
      _id: "",
      name: "",
      createdAt: new Date(),
      introduce: "",
      img: [""],
      age: 0,
      height: 0,
      weight: 0,
    },
  ]);
  const getUserCard = () => {
    const jwt = sessionStorage.getItem("jwt");
    api
      .get("/users/todayMatch", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(res => {
        setTodayUsers(res.data.data.data);
      });
  };

  const userCards = todayUsers.map(user => (
    <UserCard
      key={user._id}
      onClick={() => {
        navigator(`/chat/${user._id}`);
        currentSocket!.emit("makeRoom", { sender: id, receiver: user._id });
      }}
    >
      {user.name}
    </UserCard>
  ));

  useEffect(() => {
    getUserCard();
  }, []);

  return (
    <Background>
      <LookupContainer>{userCards}</LookupContainer>
      <FooterBar />
    </Background>
  );
}

export default LookUp;

const LookupContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
`;

const UserCard = styled.div`
  width: 100%;
  height: 150px;
  background-color: white;
`;
