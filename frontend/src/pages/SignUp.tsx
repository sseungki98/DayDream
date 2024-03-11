import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import api from "../apis/api";
import { ButtonContainer, Logo } from "./Index";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../components/TextAreaInput";
import ThroughButton from "../components/ThroughButton";

function Index() {
  const PngIconRoute = (icon: string) => {
    return process.env.PUBLIC_URL + "/img/" + icon + "-icon.png";
  };

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
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [page, setPage] = useState<number>(0);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleInputClick = () => {
    inputFileRef.current?.click();
  };

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
        <ThroughButton message="가입하기" onClick={() => setPage(2)} />
      </>
    );
  };

  const ThirdPageInputs = () => {
    return (
      <>
        <h4 style={{ color: "white" }}>본인을 표현하는 이미지를 업로드 해 주세요</h4>
        <input ref={inputFileRef} type="file" onChange={handleImageChange} accept="image/*" hidden />
        {image ? (
          <PreviewImage src={image} alt="image-preview" onClick={handleInputClick} />
        ) : (
          <EmptyPreviewImage onClick={handleInputClick}>
            <img src={PngIconRoute("plus")} alt="plus-icon" />
          </EmptyPreviewImage>
        )}
        <ThroughButton type="submit" message="가입하기" />
      </>
    );
  };

  const pageHandler = (page: number) => {
    switch (page) {
      case 0:
        return FirstPageInputs();
      case 1:
        return SecondPageInputs();
      case 2:
        return ThirdPageInputs();
      default:
        return FirstPageInputs();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !imageFile) {
      alert("사진을 추가해주세요.");
    } else {
      const formData = new FormData();
      formData.append("image", imageFile);
      Object.entries(signupInfo).forEach(item => {
        formData.append(item[0], item[1]);
      });
      console.log(formData);
      api
        .post("/users/signup", formData)
        .then(res => {
          alert("회원가입이 완료되었습니다." + signupInfo);
          navigate("/");
        })
        .catch(err => alert("에러가 발생되었습니다" + err));
    }
  };

  return (
    <Background>
      <Logo className="super-magic">DayDream</Logo>
      <ButtonContainer>
        <form encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
          {pageHandler(page)}
        </form>
      </ButtonContainer>
    </Background>
  );
}

export default Index;

export const Background = styled.div`
  background-color: #434343;
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

const EmptyPreviewImage = styled.div`
  width: 40%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
  }
`;

const PreviewImage = styled.img`
  width: 40%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 auto;
  cursor: pointer;
`;
