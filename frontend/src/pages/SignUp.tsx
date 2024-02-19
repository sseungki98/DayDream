import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import api from "../apis/api";
import { ButtonContainer, Logo } from "./Index";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../components/TextAreaInput";
import ThroughButton from "../components/ThroughButton";

function Index() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    introduce: "",
    age: "",
    height: "",
    weight: "",
  });
  const [page, setPage] = useState<Number>(0);
  const handlePageMove = () => {
    const { email, password, passwordConfirm } = signupInfo;
    if (!email || !password || !passwordConfirm) {
      alert("모두 채워주세요.");
    } else if (password !== passwordConfirm) {
      alert("동일한 비밀번호를 입력해주세요.");
    } else {
      setPage(1);
    }
  };
  const FirstPageInputs = () => {
    return (
      <>
        <Input
          type="text"
          value={signupInfo.email}
          placeholder="이메일"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, email: ev.target.value }))}
        />
        <Input
          type="password"
          value={signupInfo.password}
          placeholder="비밀번호"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, password: ev.target.value }))}
        />
        <Input
          type="password"
          value={signupInfo.passwordConfirm}
          placeholder="비밀번호 확인"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, passwordConfirm: ev.target.value }))}
        />
        <ThroughButton message="가입하기" onClick={handlePageMove} />
      </>
    );
  };

  const SecondPageInputs = () => {
    return (
      <>
        <Input
          type="text"
          value={signupInfo.name}
          placeholder="닉네임"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, name: ev.target.value }))}
        />
        <TextAreaInput
          value={signupInfo.introduce}
          placeholder="자기소개"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, introduce: ev.target.value }))}
        />
        <Input
          type="number"
          value={signupInfo.age}
          placeholder="나이"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, age: ev.target.value }))}
        />
        <Input
          type="number"
          value={signupInfo.height}
          placeholder="키(cm)"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, height: ev.target.value }))}
        />
        <Input
          type="number"
          value={signupInfo.weight}
          placeholder="몸무게(kg)"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, weight: ev.target.value }))}
        />
        <ThroughButton message="가입하기" type="submit" />
      </>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/users/signup", signupInfo)
      .then(res => {
        alert("회원가입이 완료되었습니다." + signupInfo);
        navigate("/");
      })
      .catch(err => alert("에러가 발생되었습니다" + err));
  };

  return (
    <Background>
      <Logo className="super-magic">DayDream</Logo>
      <ButtonContainer>
        <form onSubmit={e => handleSubmit(e)}>{page === 0 ? FirstPageInputs() : SecondPageInputs()}</form>
      </ButtonContainer>
    </Background>
  );
}

export default Index;

export const Background = styled.div`
  background-color: #bacfff;
  width: 100%;
  height: 100vh;
`;

export const Button = styled.button`
  width: 82.5%;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #86a9f9;
  background-color: #f7f7f7;
  cursor: pointer;
  &:hover {
    background-color: #baddf5;
  }
`;
