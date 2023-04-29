import * as types from "./ActionType";
import axios from "axios";

const postLoginRequired = () => {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
};

const postLoginSuccess = (payload) => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload,
  };
};

const postLoginFailure = () => {
  return {
    type: types.USER_LOGIN_FAILURE,
  };
};

const login = (payload)=>(dispatch) => {
  dispatch(postLoginRequired());
  // this is one of the form which we take fetch the data ot axios code
  return axios({
    method: "post",
    url: "/api/login",
    baseURL: "https://reqres.in",
    data: payload,
  })
    .then((res) => {
     return  dispatch(postLoginSuccess(res.data.token));
    })
    .catch((err) => {
      dispatch(postLoginFailure(err));
    });
};

export { login, postLoginFailure, postLoginSuccess, postLoginRequired };
