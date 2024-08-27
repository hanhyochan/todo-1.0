import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Todos from "./Todos";

export default function Main() {
  // 로컬스토리지에서 데이터 불러오기
  const savedTodosByDate = JSON.parse(localStorage.getItem("todosByDate")) || {};

  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todosByDate, setTodosByDate] = useState(savedTodosByDate);

  // 현재 선택된 날짜를 문자열로 변환 (형식: 'YYYY-MM-DD')
  const selectedDate = moment(value).format("YYYY-MM-DD");

  // 선택된 날짜에 대한 할 일 목록
  const todoList = todosByDate[selectedDate] || [];

  // 할 일 목록을 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  // 할 일 추가
  function handleSubmit(e) {
    e.preventDefault();
    if (content.trim() === "") return;

    const todoInfo = {
      id: `todo-${Date.now()}`,
      content: content,
      checked: false,
    };

    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: [...(todosByDate[selectedDate] || []), todoInfo]
    };
    setTodosByDate(updatedTodosByDate);
    setContent("");
  }

  // 할 일 삭제
  const deleteBtn = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList
    };
    setTodosByDate(updatedTodosByDate);
  };

  // 체크박스 상태 변경
  const handleCheckbox = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList
    };
    setTodosByDate(updatedTodosByDate);
  };

  // 내용 수정
  function editContent(id, newContent) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList
    };
    setTodosByDate(updatedTodosByDate);
  }

  // 할 일 목록 렌더링
  const renderedTodoList = todoList.map((todo) => (
    <Todos
      key={todo.id}
      id={todo.id}
      checked={todo.checked}
      content={todo.content}
      deleteBtn={deleteBtn}
      handleCheckbox={handleCheckbox}
      editContent={editContent}
    />
  ));

  return (
    <>
      <Calendar
        onClickDay={(date) => {
          setValue(date);
          // 선택된 날짜의 할 일 목록을 업데이트
          setContent("");
        }}
      />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할일을 입력해주세요.."
          />
          <button type="submit">입력</button>
        </form>
      </div>

      <ul>{renderedTodoList}</ul>
    </>
  );
}