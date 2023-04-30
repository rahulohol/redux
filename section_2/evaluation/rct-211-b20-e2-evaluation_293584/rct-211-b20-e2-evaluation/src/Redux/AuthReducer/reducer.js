import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

// NOTE: DO NOT MODIFY the intial state structure in this file.
const initialState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState,action) => {
  const {type,payload} = action;
  switch (type){
    case LOGIN_REQUEST:
      return{
        ...state,
        isLoading:true,
        isAuth:false,
        isError:false
      }
      case LOGIN_SUCCESS:
        return{
          ...state,
          isLoading:false,
          isError:false,
          isAuth:true,
          token:payload
        }
      case LOGIN_FAILURE:
        return{
          ...state,
          isLoading:false,
          isError:true,
          isAuth:false,
          token:payload
        }  
      default:
        return state  
  }
};

export { reducer };
