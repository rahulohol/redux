import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  reduce,
} from "./ConstAction";

const initial = { count: 0, todos: [], isLoading: false, isError: false };

const reducer = (oldState = initial, action) => {
  switch (action.type) {
    case add:
      return { ...oldState, count: oldState.count + action.payload };

    case reduce:
      return { ...oldState, count: oldState.count - action.payload };

    case GET_TODOS_REQUEST:
      return { ...oldState, isLoading: true };

    case GET_TODOS_SUCCESS:
      return { ...oldState, isLoading: false, todos: action.payload };

    case GET_TODOS_FAILURE:
      return { ...oldState, isLoading: false, todos: [], isError: true };

    default:
      return oldState;
  }
};

export { reducer };
