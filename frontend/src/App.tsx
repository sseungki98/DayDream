import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LookUp from "./pages/LookUp";
import Chat from "./pages/Chat";
import Mypage from "./pages/Mypage";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/main" Component={Main} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
