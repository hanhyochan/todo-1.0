import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import FindId from "./Login/FindId";
import FindPw from "./Login/FindPw";
import Membership from "./Login/Membership";
import Main from "./Todo/Main";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPw" element={<FindPw />} />
          <Route path="/JoinMembership" element={<Membership />} />
          <Route path="/TodoList" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
