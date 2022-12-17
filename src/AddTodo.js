import { useState } from "react";

function AddTodo({ add }) {
  const [todo, setTodo] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    add(todo);
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <form className="row g-3">
      <div className="col-md-10 col-sm-12">
        <input
          type="text"
          className="form-control"
          placeholder="New Item"
          onChange={handleChange}
          value={todo}
          required
        />
      </div>
      <div className="col-md-2 col-sm-12">
        <button
          type="submit"
          className="btn btn-main btn-block mb-3"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </form>
  );
}
export default AddTodo;