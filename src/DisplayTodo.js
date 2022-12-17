function DisplayTodo({ todoData, onStatusChange, onItemDelete }) {
    return (
      <ul>
        {todoData.map((todo) => {
          return (
            <li key={todo.id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => {
                    onStatusChange(todo.id);
                  }}
                />
                <label
                  className={`form-check-label ${todo.status ? "done" : ""}`}
                >
                  {todo.todo}
                </label>
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => {
                    onItemDelete(todo.id);
                  }}
                >
                  <span>✖</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  export default DisplayTodo;
  