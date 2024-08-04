import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

export default function Main() {
  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState([]);
  const [handleTodoList2, sethandleTodoList2] = useState([])

  const handleSubmit = {
    id: `todo-${Date.now()}`,
    content: content,
    checked: false,
  }

  sethandleTodoList2(handleTodoList)

  const todoList = handleTodoList2.map((item) => (
    <ul>
      <li>
        <input type="checkbox" 
        
        />
        <span>{content}</span>
      </li>
    </ul>
  ))

  console.log(handleTodoList)

  return (
    <div>
      <Calendar onClickDay={setValue} />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할일을 입력해주세요."
          />
          <button type="submit">입력</button>
        </form>
        <div>{todoList}</div>
      </div>
    </div>
  );
}
