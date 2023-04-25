//! third step to code in this page
import * as types from "./ActionType";
import axios from "axios";

const getTaskRequest = () => {
  return {
    type: types.GET_TODOS_REQUEST,
  };
};
const getTaskSuccess = (payload) => {
  return {
    type: types.GET_TODOS_SUCCESS,
    payload,
  };
};
const getTaskFailure = () => {
  return {
    type: types.GET_TODOS_FAILURE,
  };
};

const addTaskRequest = () => {
  return {
    type: types.ADD_TODOS_REQUEST,
  };
};
const addTaskSuccess = () => {
  return {
    type: types.ADD_TODOS_SUCCESS
  };
};
const addTaskFailure = () => {
  return {
    type: types.ADD_TODOS_FAILURE,
  };
};

const getTask=(dispatch)=>{
  dispatch(getTaskRequest())
  axios.get('http://localhost:8080/todos').then((res)=>{
      dispatch(getTaskSuccess(res.data))
  }).catch(err=>{dispatch(getTaskFailure())})
}

export { getTaskRequest, getTaskSuccess, getTaskFailure,addTaskFailure,addTaskRequest,addTaskSuccess ,getTask};
