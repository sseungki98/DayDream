import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={IndexPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
