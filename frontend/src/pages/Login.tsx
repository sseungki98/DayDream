import React, { useState } from "react";
import { Background } from "./SignUp";
import Input from "../components/Input";
import api from "../apis/api";
import { ButtonContainer, Logo } from "./Index";
import ThroughButton from "../components/ThroughButton";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/users/login", loginInfo)
      .then(res => alert("로그인이 성공했습니다." + res))
      .catch(err => alert("로그인에 실패했습니다." + err));
  };
  return (
    <Background>
      <Logo className="super-magic">DayDream</Logo>
      <ButtonContainer>
        <form onSubmit={e => handleSumbit(e)}>
          <Input
            type="text"
            value={loginInfo.email}
            placeholder="이메일"
            onChange={event => setLoginInfo(loginInfo => ({ ...loginInfo, email: event.target.value }))}
          />
          <Input
            type="password"
            value={loginInfo.password}
            placeholder="비밀번호"
            onChange={event => setLoginInfo(loginInfo => ({ ...loginInfo, password: event.target.value }))}
          />
          <ThroughButton message="로그인하기" type="submit" />
        </form>
      </ButtonContainer>
    </Background>
  );
}

export default Login;
