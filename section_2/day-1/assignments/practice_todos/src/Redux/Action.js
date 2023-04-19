import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  POST_TODOS_FAILURE,
  POST_TODOS_REQUEST,
  POST_TODOS_SUCCESS,
  sub,
} from "./ActionTypes";

const handleAdd = (payload) => {
  return { type: add, payload };
};

const handleSub = (payload) => {
  return { type: sub, payload };
};

const getHandleRequest = () => {
  return { type: GET_TODOS_REQUEST };
};
const getHandleSuccess = (payload) => {
  return { type: GET_TODOS_SUCCESS, payload };
};
const getHandleFailure = () => {
  return { type: GET_TODOS_FAILURE };
};

const postTodoRequest = () => {
  return {
    type: POST_TODOS_REQUEST,
  };
};
const postTodoSuccess = (payload) => {
  return {
    type: POST_TODOS_SUCCESS,
    payload,
  };
};
const postTodoFailure = () => {
  return {
    type: POST_TODOS_FAILURE,
  };
};

export {
  handleAdd,
  handleSub,
  getHandleRequest,
  getHandleSuccess,
  getHandleFailure,
  postTodoRequest,
  postTodoSuccess,
  postTodoFailure,
};
