import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { id: uuidv4(), text: newTodo, isEditable: false, isCompleted: false },
    ]);
    setNewTodo("");
  };

  const completeTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
  };

  const editTodo = (id, oldTodo) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditable: !todoItem.isEditable }
          : todoItem
      )
    );
    setTodoValue(oldTodo);
  };

  const saveTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isEditable: !todoItem.isEditable, text: todoValue }
          : todoItem
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todoItem) => todoItem.id !== id)
    );
  };

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <div className="main__detail">
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Username..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add ToDo</button>
        </form>
      </div>
      <div className="main__map">
        {todoList.map((todoItem) => {
          console.log(todoItem);
          return (
            <div className="main__map__detail" key={todoItem.id}>
              <div className="main__map__detail__text">
                <input
                  type="checkbox"
                  name="check"
                  value={todoItem.isCompleted}
                  onChange={() => completeTodo(todoItem.id)}
                />
                {!todoItem.isEditable ? (
                  <label
                    htmlFor="check"
                    className={`${
                      todoItem.isCompleted ? "todo__completed" : ""
                    }`}
                  >
                    {todoItem.text}
                  </label>
                ) : (
                  <input
                    className="main__map__detail__text__edit"
                    type="text"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                  />
                )}
              </div>
              <div className="main__map__detail__btn">
                {!todoItem.isEditable ? (
                  <AiFillEdit
                    className="main__map__detail__btn__icon"
                    onClick={() => editTodo(todoItem.id, todoItem.todo)}
                  />
                ) : (
                  <AiFillSave
                    className="main__map__detail__btn__icon"
                    onClick={() => saveTodo(todoItem.id)}
                  />
                )}
                <BsFillTrashFill
                  className="main__map__detail__btn__icon"
                  onClick={() => deleteTodo(todoItem.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
