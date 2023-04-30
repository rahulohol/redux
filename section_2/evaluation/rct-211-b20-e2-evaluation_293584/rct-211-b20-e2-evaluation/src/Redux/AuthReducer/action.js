//Write the ActionCreator functions here
import axios from "axios";
import * as types from "./actionTypes"


const getLoginData=(userData)=>(dispatch)=>{
    dispatch({type:types.LOGIN_REQUEST});
    return axios.get("https://reqres.in/api/login",userData)
    .then((res)=>{
        return dispatch({type:types.LOGIN_SUCCESS,payload:res.data})
    })
    .catch(()=>{
        dispatch({type:types.LOGIN_FAILURE})
    })
}

export {getLoginData}