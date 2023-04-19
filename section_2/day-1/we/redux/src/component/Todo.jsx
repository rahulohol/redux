import React, { useEffect } from "react";
import { TodoInput } from "./TodoInput";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  postTodoFailure,
  postTodoRequest,
  postTodoSuccess,
} from "../Redux/ActionType";

function Todo() {
  const dispatch = useDispatch(); //this is from react-redux
  /*  const isLoading=useSelector((state)=>state.isLoading);
  const {todos}=useSelector((state)=>state.todos) */
  //both are same ☝️👇
  const { todos, isLoading, isError } = useSelector((state) => {
    return {
      todos: state.todos,
      isLoading: state.isLoading,
      isError: state.isError,
    };
  }, shallowEqual);

  const getTodo = () => {
    // this is for the request fetch and showing isLoading true
    dispatch(getTodosRequest());
    return axios
      .get("http://localhost:8080/Todos")
      .then((res) => {
        // this is for the api successfully pass and give with payload as the data
        dispatch(getTodosSuccess(res.data));
      })
      .catch((err) => {
        // this is for error occurs
        dispatch(getTodosFailure());
      });
  };
  // get all the todos that we have in the db.json file

  const addTodo = (title) => {
    if (title) {
      const payload = {
        title,
        status: false,
      };
      dispatch(postTodoRequest());
      return axios
        .post(" http://localhost:8080/Todos", payload)
        .then((res) => {
          dispatch(postTodoSuccess(res.data));
        })
        .catch((err) => {
          dispatch(postTodoFailure());
        });
    }
  };

  const handleAddTodo = (text) => {
    addTodo(text)
      .then(() => getTodo())
      .then(() => {
        console.log("Data added successfully");
      });
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
        todos.map((items) => {
          return (
            <div key={items.id}>
              {items.title}-{items.status ? "True" : "False"}
            </div>
          );
        })}
    </div>
  );
}

export { Todo };
