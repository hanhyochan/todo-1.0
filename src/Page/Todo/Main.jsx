import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

export default function Main() {
  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  localStorage.setItem('todoList', JSON.stringify(todoList));

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
    setTodoList(todoList.map(x => 
      x.id === id ? { ...x, checked: !x.checked } : x
    ));
  };

  const renderedTodoList = todoList.map((x) => (
    <ul key={x.id}>
      <li>
        <input
          type="checkbox"
          checked={x.checked}
          onChange={() => handleCheckbox(x.id)}
        />
        <span>{x.content}</span>
      </li>
    </ul>
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

      <div>{renderedTodoList}</div>
    </>
  );
}
