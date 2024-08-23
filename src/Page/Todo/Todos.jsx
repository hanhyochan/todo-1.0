import React from "react";
import { useState } from "react";

export default function Todos({ id, checked, content }) {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));

  const [view, setView] = useState(true);
  const [todoList, setTodoList] = useState(savedTodoList);

  const handleCheckbox = (id) => {
    setTodoList(
      todoList.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x))
    );
  };

  const deleteBtn = (id) => {
    console.log(id);
    const updatedTodoList = todoList.filter((todoList) => todoList.id !== id);
    setTodoList(updatedTodoList);
  };

  const viewTemplate = (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheckbox(id)}
          />
          <span>{content}</span>
          <button onClick={() => deleteBtn(id)}>삭제</button>
          <button onClick={() => setView(false)}>수정</button>
        </label>
      </div>
    </>
  );

  const editTemplate = (
    <>
      <p>하이</p>
    </>
  );

  return <li>{view ? viewTemplate : editTemplate}</li>;
}
