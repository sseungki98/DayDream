import React from "react";
import styled from "styled-components";
import { FooterType } from "../pages/Main";

function FooterBar({ onItemClick }: { onItemClick: (item: FooterType) => void }) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    onItemClick(target.value as FooterType);
  };

  return (
    <FooterContainer onClick={e => clickHandler(e)}>
      <FooterItem value="lookup" key="lookup" className="item" color="white">
        둘러보기
      </FooterItem>
      <FooterItem value="chat" key="chat" className="item" color="blue">
        채팅
      </FooterItem>
      <FooterItem value="etc" key="etc" className="item" color="black">
        나의피드
      </FooterItem>
      <FooterItem value="mypage" key="mypage" className="item" color="green">
        마이페이지
      </FooterItem>
    </FooterContainer>
  );
}

export default FooterBar;

const FooterContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 393px;
  height: 70px;
`;

const FooterItem = styled.button<{ color: string }>`
  cursor: pointer;
  width: calc(393px / 4);
  height: 70px;
  background-color: ${props => props.color};
  border: none;
`;
