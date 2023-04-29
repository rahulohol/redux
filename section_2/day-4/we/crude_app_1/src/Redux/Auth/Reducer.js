import * as types from "./ActionType";

const initialState = {
  isAuth: false,
  token: "",
  isAuthLoading: false,
  isError: false,
};
const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isAuthLoading: true,
        
      };

    case types.USER_LOGIN_SUCCESS:
      return {
        ...oldState,
        isAuthLoading: false,
        token: payload,
        isAuth:true,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isAuthLoading: false,
        isError: true,
        token: "",
        isAuth:false,
      };
      default :
      return oldState
  }
};

export { reducer };
