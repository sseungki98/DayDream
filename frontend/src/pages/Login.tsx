import React, { useState } from "react";
import { Background } from "./SignUp";
import Input from "../components/Input";
import api from "../apis/api";
import { ButtonContainer, Logo } from "./Index";
import ThroughButton from "../components/ThroughButton";
import { connectSocket } from "../utils/socket";
import { useLogin } from "../stores/useLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { login } = useLogin();
  const navigator = useNavigate();

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    login(email, password, navigator);
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
