import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  function handleBtn(e) {
    e.preventDefault();
    let userInfo = JSON.parse(localStorage.getItem("userInfos"));

    if (userInfo == null) {
      userInfo = [];
    }

    const infoForm = {
      key: crypto.randomUUID(),
      id: id,
      pw: pw,
    };
    
    localStorage.setItem("userInfos", JSON.stringify([...userInfo, infoForm]));
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleBtn}>
        <input
          value={id}
          onChange={handleId}
          placeholder="아이디를 입력해주세요hh"
        />{" "}
        <br />
        <input
          value={pw}
          onChange={handlePw}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />{" "}
        <br />
        <button type="submit">확인</button>
      </form>
      <span
        onClick={() => {
          navigate("/FindId");
        }}
      >
        아이디 찾기
      </span>
      <span
        onClick={() => {
          navigate("/FindPw");
        }}
      >
        비밀번호 찾기
      </span>
      <span
        onClick={() => {
          navigate("/JoinMembership");
        }}
      >
        회원가입
      </span>
    </>
  );
}
