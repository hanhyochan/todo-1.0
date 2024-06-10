import { useState } from "react";

export default function FindPw() {
  const [view, setView] = useState(false);
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [findNum, setFindNum] = useState("");
  const [newPw, setnewPw] = useState("");

  const handleFindId = (e) => {
    setFindId(e.target.value);
  };

  const handlefindName = (e) => {
    setFindName(e.target.value);
  };

  const handlefindNum = (e) => {
    setFindNum(e.target.value);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    const idInfo = {
      id: findId,
      name: findName,
      number: findNum,
    };
    console.log(idInfo);
  };

  const handleNewPw = (e) => {
    setnewPw(e.target.value);
  };

  const handleBtn2 = (e) => {
    e.preventDefault();
    const idInfo2 = {
      pw: newPw,
    };
    console.log(idInfo2);
  };

  return (
    <>
      <h1>비밀번호 찾기</h1>
      {view ? (
        <>
          <p>아이디와 개인정보를 입력해주세요</p>
          <form onSubmit={handleBtn}>
            <input
              value={findId}
              type="type"
              placeholder="아이디를 입력해주세요."
              onChange={handleFindId}
            />
            <br />
            <input
              value={findName}
              type="type"
              placeholder="이름을 입력해주세요."
              onChange={handlefindName}
            />
            <br />
            <input
              value={findNum}
              type="number"
              placeholder="전화번호를 입력해주세요."
              onChange={handlefindNum}
            />
            <button>인증하기</button>
            <br />
            <button type="submit">확인</button>
          </form>
        </>
      ) : (
        <>
          <p>새로운 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleBtn2}>
            <input
              value={newPw}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleNewPw}
            />
            <br />
            <button type="submit">확인</button>
          </form>
        </>
      )}
    </>
  );
}
