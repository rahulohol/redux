import React, { useEffect } from "react";
import { TodoInput } from "./TodoInput";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getHandleFailure,
  getHandleRequest,
  getHandleSuccess,
  postTodoFailure,
  postTodoRequest,
  postTodoSuccess,
} from "../Redux/Action";

function Todo() {
  const dispatch = useDispatch();
  /*   const isLoading=useSelector(state=>state.isLoading);
  const todos=useSelector(state=>state.todos); */

  const { todos, isLoading, isError } = useSelector((state) => {
    return {
      todos: state.todos,
      isLoading: state.isLoading,
      isError: state.isError,
    };
  }, shallowEqual);

  const getTodo = () => {
    dispatch(getHandleRequest());
    return axios
      .get("http://localhost:8080/todos")
      .then((res) => dispatch(getHandleSuccess(res.data)))
      .catch((err) => dispatch(getHandleFailure()));
  };

  const addTodo = (title) => {
    if (title) {
      const payload = {
        title,
        status: false,
      };
      dispatch(postTodoRequest());
      return axios
        .post("http://localhost:8080/todos", payload)
        .then((res) => dispatch(postTodoSuccess(res.data)))
        .catch((err) => dispatch(postTodoFailure()));
    }
  };

  const handleAddTodo = (text) => {
    addTodo(text).then(()=>getTodo()).then(()=>{console.log("Data is added successfully")})
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TodoInput handleAddTodo={handleAddTodo} />
      )}
      {todos.length > 0 &&
        todos.map((item) => {
          return (
            <div key={item.id}>
              {item.title}-{item.status ? "True" : "false"}
            </div>
          );
        })}
    </div>
  );
}

export { Todo };
