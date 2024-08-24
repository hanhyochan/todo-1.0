import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Todos from "./Todos";

export default function Main() {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));

  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState(savedTodoList);

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

  const deleteBtn = (id) => {
    console.log(id);
    const updatedTodoList = todoList.filter((todoList) => todoList.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleCheckbox = (id) => {
    setTodoList(
      todoList.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x))
    );
  };

  function editContent(id, newContent) {
    const editedContent = todoList.map((x) => {
      if (x.id === id) {
        return { ...x, content: newContent };
      }
      return x;
    });
    setTodoList(editedContent);
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

      <ul>{renderedTodoList}</ul>
    </>
  );
}
