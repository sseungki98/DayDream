import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { userInfo } from "os";
import api from "../apis/api";

function Index() {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    introduce: "",
    age: 0,
    height: 0,
    weight: 0,
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
          type="text"
          value={signupInfo.password}
          placeholder="비밀번호"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, password: ev.target.value }))}
        />
        <Input
          type="text"
          value={signupInfo.passwordConfirm}
          placeholder="비밀번호 확인"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, passwordConfirm: ev.target.value }))}
        />
        <Button onClick={handlePageMove}>가입하기</Button>
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
        <Input
          type="text"
          value={signupInfo.introduce}
          placeholder="자기소개"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, introduce: ev.target.value }))}
        />
        <Input
          type="number"
          value={signupInfo.age}
          placeholder="나이"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, age: Number(ev.target.value) }))}
        />
        <Input
          type="number"
          value={signupInfo.height}
          placeholder="키"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, height: Number(ev.target.value) }))}
        />
        <Input
          type="number"
          value={signupInfo.weight}
          placeholder="몸무게"
          onChange={ev => setSignupInfo(userInfo => ({ ...userInfo, weight: Number(ev.target.value) }))}
        />
        <Button type="submit">가입하기</Button>
      </>
    );
  };

  const handleSubmit = () => {
    api
      .post("/users/signup", signupInfo)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Background>
      <form onSubmit={handleSubmit}>{page === 0 ? FirstPageInputs() : SecondPageInputs()}</form>
    </Background>
  );
}

export default Index;

const Background = styled.div`
  background-color: #bacfff;
  height: 100vh;
`;

const Button = styled.button`
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
