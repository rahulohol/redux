import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  POST_TODO_FAILURE,
  POST_TODO_REQUEST,
  POST_TODO_SUCCESS,
  reduce,
} from "./ConstAction";

export const handleAdd = (payload) => {
  return { type: add, payload };
};

export const handleReduce = (payload) => {
  return { type: reduce, payload };
};

const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const getTodosSuccess = (payload) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload,
  };
};
const getTodosFailure = () => {
  return {
    type: GET_TODOS_FAILURE,
  };
};

const postTodoRequest = () => {
  return {
    type: POST_TODO_REQUEST,
  };
};
const postTodoSuccess = (payload) => {
  return {
    type: POST_TODO_SUCCESS,
    payload,
  };
};
const postTodoFailure = () => {
  return {
    type: POST_TODO_FAILURE,
  };
};

export {
  getTodosFailure,
  getTodosSuccess,
  getTodosRequest,
  postTodoRequest,
  postTodoFailure,
  postTodoSuccess,
};
