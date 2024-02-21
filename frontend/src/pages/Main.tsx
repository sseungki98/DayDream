import React, { useState } from "react";
import { Background } from "./SignUp";
import FooterBar from "../components/FooterBar";
import LookUp from "./LookUp";
import Chat from "./Chat";
import Mypage from "./Mypage";
import PrivateChat from "./PrivateChat";

export type FooterType = "lookup" | "chat" | "mypage" | "etc";

function Main() {
  const [footerStatus, setFooterStatus] = useState<FooterType>("lookup");
  const viewHandler = () => {
    switch (footerStatus) {
      case "lookup":
        return <LookUp />;
      case "chat":
        return <Chat />;
      case "mypage":
        return <Mypage />;
      case "etc":
        return <PrivateChat onItemClick={itemClickHandler}/>;
    }
  };

  const itemClickHandler = (item: FooterType) => {
    setFooterStatus(item);
  };
  return (
    <>
      <Background>{viewHandler()}</Background>
      <FooterBar onItemClick={itemClickHandler} />
    </>
  );
}

export default Main;
