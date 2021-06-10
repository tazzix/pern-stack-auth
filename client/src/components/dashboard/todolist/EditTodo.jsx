import React, { useState } from 'react';

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);

  // editText function
  const editText = async (id) => {
    try {
      const body = { description };
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('jwt_token', localStorage.token);

      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTodoEvent = () => {
    setDescription(todo.description);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>
      {/* id = "id21" */}
      <div
        className="modal"
        role="button"
        tabIndex={0}
        id={`id${todo.id}`}
        onClick={handleTodoEvent}
        onKeyPress={handleTodoEvent}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
