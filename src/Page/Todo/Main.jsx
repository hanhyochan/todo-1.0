import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Todos from "./Todos";

export default function Main() {
  const savedTodoList = JSON.parse(localStorage.getItem("todosByDate")) || {};

  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todosByDate, setTodosByDate] = useState(savedTodoList);

  const selectedDate = moment(value).format("YYYY년 MM월 DD일");

  const todoList = todosByDate[selectedDate] || [];

  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

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
      [selectedDate]: [...(todosByDate[selectedDate] || []), todoInfo],
    };

    setTodosByDate(updatedTodosByDate);
    setContent("");
  }

  const deleteBtn = (id) => {
    console.log(id);
    const updatedTodoList = todoList.filter((todoList) => todoList.id !== id);
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    setTodosByDate(updatedTodosByDate);
  };

  const handleCheckbox = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    setTodosByDate(updatedTodosByDate);
  };

  function editContent(id, newContent) {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );
    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    setTodosByDate(updatedTodosByDate);
  }

  const renderedTodoList = todoList.map((x) => (
    <Todos
      key={x.id}
      id={x.id}
      checked={x.checked}
      content={x.content}
      deleteBtn={deleteBtn}
      handleCheckbox={handleCheckbox}
      editContent={editContent}
    />
  ));

  return (
    <>
      <Calendar id="calendar" onClickDay={setValue} />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할일을 입력해주세요.."
          />
          <button>입력</button>
        </form>
      </div>

      <ul>{renderedTodoList}</ul>
    </>
  );
}
