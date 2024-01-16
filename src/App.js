import "./App.css";
import { useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const addTodo = () => {
    const trimmedTodo = toDo.trim();

    if (trimmedTodo && !toDos.some((item) => item.text === trimmedTodo)) {
      setToDos([...toDos, { id: Date.now(), text: trimmedTodo, status: false }]);
      setToDo("");
    } else {
      // Show the popup if the input is empty
      setShowPopup(true);
    }
  };

  const deleteTodo = (id) => {
    const updatedToDos = toDos.filter((obj) => obj.id !== id);
    setToDos(updatedToDos);
  };

  const toggleStatus = (id, checked) => {
    const updatedToDos = toDos.map((obj) =>
      obj.id === id ? { ...obj, status: checked } : obj
    );
    setToDos(updatedToDos);
  };

  const closePopup = () => {
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => toggleStatus(obj.id, e.target.checked)}
                checked={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => deleteTodo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <p className="text-color-empty">Please enter a non-empty todo.</p>
          <button onClick={closePopup}>OK</button>
        </div>
      )}
    </div>
  );
}

export default App;
