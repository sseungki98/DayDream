import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./pages/Main";
import LookUp from "./pages/LookUp";
import Mypage from "./pages/Mypage";
import PrivateChat from "./pages/PrivateChat";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/main" Component={Main} />
        <Route path="/lookup" Component={LookUp} />
        <Route path="/chat/:id" Component={PrivateChat} />
        <Route path="/chat" Component={Chat} />
        <Route path="/mypage" Component={Mypage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
