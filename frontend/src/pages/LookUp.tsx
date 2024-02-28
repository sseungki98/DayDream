import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";

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
        console.log(res.data.data.data);
        setTodayUsers(res.data.data.data);
        console.log(todayUsers);
      });
  };

  const userCards = todayUsers.map(user => (
    <UserCard key={user._id} onClick={() => navigator(`/chat/${user._id}`)}>
      {user.name}
    </UserCard>
  ));

  useEffect(() => {
    getUserCard();
  }, []);

  return <LookupContainer>{userCards}</LookupContainer>;
}

export default LookUp;

const LookupContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
  /* overflow: scroll; */
`;

const UserCard = styled.div`
  width: 100%;
  height: 150px;
  background-color: white;
`;
