import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid"; // random id atama

const Main = () => {
  const [todoValue, setTodoValue] = useState(""); // edit inputunu düzenlemek için tutulan state
  const [todoList, setTodoList] = useState([]); // todolar için oluşturduğumuz dizileri tutup, değiştiren state
  const [newTodo, setNewTodo] = useState(""); // add inputu için oluşturduğum state

  const addTodo = (e) => {
    e.preventDefault(); // todo eklediğimde liste sıfırlanmaması için
    setTodoList((prevTodoList) => [
      // // state değerine prevtodolist parametresi verdik
      ...prevTodoList, // parametrede saklanan değerler yeni eklenenlerle beraber gelsin, kaybolmasın diye çağırdık
      { id: uuidv4(), text: newTodo, isEditable: false, isCompleted: false }, // random id, input içindeki text, ( edit ve check default halde)
    ]);
    setNewTodo(""); // ekleme yaptıktan sonra input boş kalsın
  };

  const completeTodo = (id) => {
    // tikleme için fonksiyona id verdik
    setTodoList(
      (
        prevTodoList // dizimizi çağırdık
      ) =>
        prevTodoList.map(
          (
            todoItem // bütün diziyi tekrardan kontrol edip istediğimizi bulması için mapledik
          ) =>
            todoItem.id === id //  maplediğimizde gelen id seçilenin idsine eşit
              ? { ...todoItem, isCompleted: !todoItem.isCompleted } // doğruysa dizi elemanını al, ve seçilen elemanın tikini şu anda olanın tam tersi yap
              : todoItem // yanlışsa orjinal hali kalsın
        )
    );
  };

  const editTodo = (id, oldTodo) => {
    // editlemek istediğimiz elemanın id ve textini çağırdık
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id // editlemek istediğimiz datayı bulabilmek için arrayi döndürdük, içerisinde seçili datamızı bulduk
          ? { ...todoItem, isEditable: !todoItem.isEditable } // seçili itemı yakaladık ve editable halini true ya çektik
          : todoItem
      )
    );
    setTodoValue(oldTodo); // yeni editlenmiş değerimizi todoValue içinde çağırdık
  };

  const saveTodo = (id) => {
    // editlemek istediğimiz elemanın idsini yakaladık
    setTodoList((prevTodoList) =>
      prevTodoList.map((todoItem) =>
        todoItem.id === id // kaydetmek istediğimiz datayı bulabilmek için arrayi döndürdük, içerisinde seçili datamızı bulduk
          ? {
              ...todoItem,
              isEditable: !todoItem.isEditable, // butona basınca save işlemini gerçekleştirdik editable false oldu
              text: todoValue, // yeni değerimizi text içerisine aktardık
            }
          : todoItem
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(
      (prevTodoList) => prevTodoList.filter((todoItem) => todoItem.id !== id) // filtrelenen ürünlerin idleri parametre idsine eşit değilse
    );
  };

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <div className="main__detail">
        <form onSubmit={addTodo}>
          <input // enter atmak için form içine aldık ve addtodo fonksiyonunu verdik
            type="text"
            placeholder="Username..."
            value={newTodo} // ilk input değeri için oluşturduğum state değeri
            onChange={(e) => setNewTodo(e.target.value)} // inputun valuesinde yapılan değişiklik set edildi
          />
          <button type="submit">Add ToDo</button>
        </form>
      </div>
      <div className="main__map">
        {todoList.map((todoItem) => {
          // dizi halinde oluşturduğumuz state içini doldurmak için mapledik. todoıtem parametresini verdik
          console.log(todoItem);
          return (
            <div className="main__map__detail" key={todoItem.id}>
              <div className="main__map__detail__text">
                <input
                  type="checkbox"
                  name="check"
                  value={todoItem.isCompleted} // tikleme için oluşturduğumuz checkbox inputun value değeri başta oluşturduğumuz üzere false
                  onChange={() => completeTodo(todoItem.id)} // tıkladığımızda oluşan değişim için onchange fonksiyonu verdik ve id ile seçtik
                />
                {!todoItem.isEditable ? ( // edit modunda değilse todoları göster
                  <label
                    htmlFor="check"
                    className={`${
                      todoItem.isCompleted ? "todo__completed" : ""
                    }`}
                  >
                    {todoItem.text}
                  </label>
                ) : (
                  // seçili itemın edit modunu açtık
                  <input
                    className="main__map__detail__text__edit"
                    type="text"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                  />
                )}
              </div>
              <div className="main__map__detail__btn">
                {!todoItem.isEditable ? ( // editleme fonksiyonu çalışıyorsa
                  <button
                    className="main__map__detail__btn__icon"
                    onClick={() => editTodo(todoItem.id, todoItem.text)}
                  >
                    <AiFillEdit
                    // edit iconu gözükecek
                    // click olduğunda  edittodo fonskiyonu çalışsın, id ve textini
                    />
                  </button>
                ) : (
                  <button
                    className="main__map__detail__btn__icon"
                    onClick={() => saveTodo(todoItem.id)}
                  >
                    <AiFillSave // çalışmıyorsa save iconu kalsın
                    // savetodo fonksiyonu çalışır tıklanırsa
                    />
                  </button>
                )}
                <button
                  className="main__map__detail__btn__icon"
                  onClick={() => deleteTodo(todoItem.id)}
                >
                  <BsFillTrashFill
                  // deletetodo fonksiyonu çalışır tıklanırsa
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
