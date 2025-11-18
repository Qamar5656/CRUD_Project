import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchinput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      // alert("enter something in todo task");
    } else {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };
  const message = "No matching found";
  const filteredtodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchinput.toLowerCase())
  );

  return (
    <>
      <div className="py-12">
        <div>
          <h1 className="text-center font-bold text-2xl">TodoList</h1>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          {/* search input */}
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border p-2"
          />
          {searchinput && filteredtodos.length > 0 ? (
            <ul>
              {filteredtodos.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          ) : (
            <p>{searchinput ? message : null}</p>
          )}
          {/* add task input  */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo}
              // maxLength={10}
              placeholder="Enter Your task"
              className="border-2 p-2"
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="border p-2 bg-gray-300 px-3 text-2xl">+</button>
          </form>
          <div className="container">
            <ul className=" flex flex-col px-8">
              {todos.map((item, index) => (
                <li key={index} className="border-2 p-2 text-black">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
