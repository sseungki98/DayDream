import React from "react";
import styled from "styled-components";

function LookUp() {
  // const getUserCard = () => {
  // }
  return (
    <LookupContainer>
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </LookupContainer>
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
  /* overflow: scroll; */
`;

const UserCard = styled.div`
  width: 100%;
  height: 150px;
  background-color: white;
`;
