import React, { useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment';

export default function Main() {
  const [value, setValue] = useState(new Date());
  const [todo, setTodo] = useState('');

  function handleSubmit() {
    e.preventDefault();
    const todos = {
      id: value,
      content: todo,
    };
    console.log(todos);
  }

  const handleTodos = (e) => {
    setTodo(e.target.value)
  };

  return (
    <div>
      <Calendar onClickDay={setValue} />
      <div>
      {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <input
        type='text'
        value={todo || ""}
        onChange={handleTodos}
          placeholder='할일을 입력해주세.'
        />
        <button>입력</button>
        </form>
        <ul>
        <li>df</li>
        <li>df</li>
        <li>df</li>
        </ul>
      </div>
    </div>
  )
}
