import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import FindId from "./Login/FindId";
import FindPw from "./Login/FindPw";
import Membership from "./Login/Membership";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPw" element={<FindPw />} />
          <Route path="/JoinMembership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
