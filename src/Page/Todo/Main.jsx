import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

export default function Main() {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));

  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState(savedTodoList);
  const [view, setView] = useState(true);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleSubmit(e) {
    e.preventDefault();
    if (content.trim() === "") return;

    const todoInfo = {
      id: `todo-${Date.now()}`,
      content: content,
      checked: false,
    };
    setTodoList([...todoList, todoInfo]);
    setContent("");
  }

  const handleCheckbox = (id) => {
    setTodoList(
      todoList.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x))
    );
  };

  const deleteBtn = (id) => {
    const updatedTodoList = todoList.filter((todoList) => todoList.id !== id);
    setTodoList(updatedTodoList);
  };

  const renderedTodoList = todoList.map((x) => (
    <li>
      <label key={x.id}>
        <input
          type="checkbox"
          checked={x.checked}
          onChange={() => handleCheckbox(x.id)}
        />
        <span>{x.content}</span>
        <button onClick={() => deleteBtn(x.id)}>삭제</button>
        <button onClick={() => setView(false)}>수정</button>
      </label>
    </li>
  ));

  const editTodoList = <div>하이</div>;

  return (
    <>
      <Calendar onClickDay={setValue} />
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

      <ul>
        {view ? renderedTodoList : editTodoList}
      </ul>
    </>
  );
}