import React from "react";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  function handleBtn(e) {
    e.preventDefault();  // 페이지 새로고침 방지
    const userInfo = {
      key: crypto.randomUUID(),
      id: id,
      pw: pw,
    };
    console.log(userInfo);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleBtn}>
        <input
          value={id}
          onChange={handleId}
          placeholder="아이디를 입력해주세요"
        />
        <input
          value={pw}
          onChange={handlePw}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button type="submit">확인</button>
      </form>
    </>
  );
}