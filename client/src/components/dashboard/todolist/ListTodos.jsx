import React, { useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
  // console.log(allTodos);
  const [todos, setTodos] = useState([]); // useState to set todos to

  // delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: { jwt_token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <>
      {' '}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.length !== 0
            && todos.id !== null
            && todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
