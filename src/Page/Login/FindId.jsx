import { useState } from "react";

export default function FindId() {

  const [view, setView] = useState(true);
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [findNum, setFindNum] = useState("");
  const [newId, setnewId] = useState("");

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
    setnewId(e.target.value);
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
      <h1>아이디 찾기</h1>
      {view ? (
        <>
          <p>비밀번호와 개인정보를 입력해주세요</p>
          <form onSubmit={handleBtn}>
            <input
              value={findId}
              type="password"
              placeholder="비밀번호를 입력해주세요."
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
              id="number"
              value={findNum}
              type="number"
              placeholder="전화번호를 입력해주세요."
              onChange={handlefindNum}
            />
            <label for="number">'-' 생략</label>
            <br />
            <button type="submit">확인</button>
          </form>
        </>
      ) : (
        <>
          <p>새로운 아이디를 입력해주세요.</p>
          <form onSubmit={handleBtn2}>
            <input
              value={newId}
              type="type"
              placeholder="아이디를 입력해주세요."
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
