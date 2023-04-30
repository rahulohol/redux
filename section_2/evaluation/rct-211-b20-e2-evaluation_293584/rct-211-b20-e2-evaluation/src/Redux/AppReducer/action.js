//Write the ActionCreator functions here
import * as types from "./actionType"
import axios from "axios"

const getWatchData=(queryparam)=>(dispatch)=>{
    dispatch({type:types.GET_WATCHES_DATA_REQUEST})
    return axios.get("http://localhost:8080/watches",queryparam)
    .then((res)=>{
        dispatch({type:types.GET_WATCHES_DATA_SUCCESS,payload:res.data});
    })
    .catch(()=>{
        dispatch({type:types.GET_WATCHES_DATA_FAILURE})
    })
}

export {getWatchData}