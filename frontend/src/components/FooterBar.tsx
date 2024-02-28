import React from "react";
import styled from "styled-components";
import { FooterType } from "../pages/Main";
import { useNavigate } from "react-router-dom";

export const IconRoute = (icon: string) => {
  return process.env.PUBLIC_URL + "/img/" + icon + "-icon.svg";
};

// { onItemClick }: { onItemClick: (item: FooterType) => void }
function FooterBar() {
  const navigator = useNavigate();
  // const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLButtonElement;
  //   onItemClick(target.value as FooterType);
  // };
  const navigateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const route = target.value;
    navigator(`/${route}`);
  };

  return (
    // <FooterContainer onClick={e => clickHandler(e)}>
    //   <FooterItem value="lookup" key="lookup" className="item">
    //     <img src={IconRoute("lookup")} alt="lookup-icon" width={48} height={48} />
    //   </FooterItem>
    //   <FooterItem value="chat" key="chat" className="item">
    //     <img src={IconRoute("chat")} alt="chat-icon" width={48} height={48} />
    //   </FooterItem>
    //   <FooterItem value="etc" key="etc" className="item">
    //     <img src={IconRoute("profile")} alt="profile-icon" width={48} height={48} />
    //   </FooterItem>
    //   <FooterItem value="mypage" key="mypage" className="item">
    //     <img src={IconRoute("profile")} alt="profile-icon" width={48} height={48} />
    //   </FooterItem>
    // </FooterContainer>
    <FooterContainer>
      <FooterItem value="lookup" key="lookup" className="item" onClick={e => navigateHandler(e)}>
        <img src={IconRoute("lookup")} alt="lookup-icon" width={48} height={48} />
      </FooterItem>
      <FooterItem value="chat" key="chat" className="item" onClick={e => navigateHandler(e)}>
        <img src={IconRoute("chat")} alt="chat-icon" width={48} height={48} />
      </FooterItem>
      <FooterItem value="etc" key="etc" className="item" onClick={e => navigateHandler(e)}>
        <img src={IconRoute("profile")} alt="profile-icon" width={48} height={48} />
      </FooterItem>
      <FooterItem value="mypage" key="mypage" className="item" onClick={e => navigateHandler(e)}>
        <img src={IconRoute("profile")} alt="profile-icon" width={48} height={48} />
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

const FooterItem = styled.button`
  cursor: pointer;
  width: calc(393px / 4);
  height: 70px;
  border: none;
  img {
    pointer-events: none;
  }
`;
