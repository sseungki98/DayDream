import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Background } from "./SignUp";
import ThroughButton from "../components/ThroughButton";

function Index() {
  const navigate = useNavigate();
  const navigator = (url: string) => {
    if (url === "/signup") {
      navigate("/signup");
    } else if (url === "/login") {
      navigate("/login");
    }
  };
  return (
    <Background>
      <Logo className="super-magic">DayDream</Logo>
      <ButtonContainer>
        <ThroughButton message="로그인하기" onClick={() => navigator("/login")} />
        <ThroughButton message="가입하기" onClick={() => navigator("/signup")} />
        {/* <Button onClick={() => navigator("/login")}>로그인하기</Button>
        <Button onClick={() => navigator("/signup")}>가입하기</Button> */}
      </ButtonContainer>
    </Background>
  );
}

export const Logo = styled.p`
  font-size: 60px;
  margin-top: 0px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

export default Index;
