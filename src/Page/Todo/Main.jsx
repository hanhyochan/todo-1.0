import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

export default function Main() {
  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      const newTodo = {
        id: `todo-${Date.now()}`,
        content: content,
        checked: false,
      };
      setTodoList([...todoList, newTodo]);
      setContent(""); // 입력 후 입력 필드 비우기
    }
  };

  const handleCheckboxChange = (id) => {
    setTodoList(todoList.map(todo => 
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  const renderedTodoList = todoList.map((item) => (
    <ul key={item.id}>
      <li>
        <input 
          type="checkbox" 
          checked={item.checked} 
          onChange={() => handleCheckboxChange(item.id)} 
        />
        <span>{item.content}</span>
      </li>
    </ul>
  ));

  return (
    <div>
      <Calendar onClickDay={setValue} />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할일을 입력해주세요."
          />
          <button type="submit">입력</button>
        </form>
        <div>{renderedTodoList}</div>
      </div>
    </div>
  );
}