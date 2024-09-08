import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Todos from "./Todos";

export default function Main() {
  const savedTodoList = JSON.parse(localStorage.getItem("todosByDate")) || {};

  const [value, setValue] = useState(new Date());
  const [content, setContent] = useState("");
  const [todosByDate, setTodosByDate] = useState(savedTodoList);

  const selectedDate = moment(value).format("YYYYMMDD");

  const todoList = todosByDate[selectedDate] || [];

  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (content.trim() === "") return;

    const todoInfo = {
      id: crypto.randomUUID(),
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
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    // updatedTodoList라는 변수에 todoList 배열에 들어있는 갯수 만큼 todo의 아이디와 내가 선택한 todo id를 비교한다.
    // 내가 선택한 todo id와 같은 id 갖고 있는 애 빼고 모두 updatedTodoList에 넣는다.

    const updatedTodosByDate = {
      ...todosByDate,
      [selectedDate]: updatedTodoList,
    };
    // updatedTodosByDate라는 변수에 기존 todosByDate의 내용을 스프레드 연산자로 풀고(...todosByDate), 기존 선택한 날짜([selectedDate])에 updatedTodoList를 넣은 값을 업데이트한다.
    // 기존 데이터와 변경된 데이터를 한번에 변수에 넣으면 덮어씌우기 되어서 변경된 값으로 저장된다.

/*
1. delete 객체.키값
2. 구조분해
3. Object.entries(배열로 변환)=>filter=>객체(Object.fromEntries)
//{"20240907":[{"id":"5ec6bdb4-bc54-4097-a2a2-6579eb1b6d22","content":"ㄴㅇㄹㅇㄴㄹ","checked":false}],"20240915":[]}
//=>[[key,value],[key,value],[key,value]]
console.log(Object.entries(updatedTodosByDate))
//[["20240907", [{"id":"5ec6bdb4-bc54-4097-a2a2-6579eb1b6d22","content":"ㄴㅇㄹㅇㄴㄹ","checked":false}]], [20240915, []]]

Object.entries(updatedTodosByDate).filter((obj)=>console.log(obj))
/*["20240907", [{"id":"5ec6bdb4-bc54-4097-a2a2-6579eb1b6d22","content":"ㄴㅇㄹㅇㄴㄹ","checked":false}]

[20240915, []]

Object.entries(updatedTodosByDate).filter((obj)=>console.log(obj[0]))
/*["20240907", [{"id":"5ec6bdb4-bc54-4097-a2a2-6579eb1b6d22","content":"ㄴㅇㄹㅇㄴㄹ","checked":false}]

[20240915, []]
*/

if (updatedTodoList.length === 0) {
  const {[selectedDate]:_,...newUpdated}=updatedTodosByDate
  setTodosByDate(newUpdated);
} else{
  setTodosByDate(updatedTodosByDate);
}
// 위에서 선택한 날짜인 [selectedDate]의 갯수가 0일경우(변경된 배열)
// updatedTodosByDate을 구조분해할당해서 선택한 날짜([selectedDate])는 그대로 넣고(키), 변경된 값은 rest연산자로 newUpdated라는 이름으로 할당한다.

// 위에서 선택한 날짜인 [selectedDate]의 갯수가 0이 아닐 경우 updatedTodosByDate를 그대로 useState에 넣는다.
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
    <div id="todo_layout_1">
      <div id="todo_layout_2">
        <Calendar onClickDay={setValue} />

        <div id="todoList">
          <h3>{moment(value).format("YYYY년 MM월 DD일")}</h3>
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
        </div>
      </div>
    </div>
  );
}
