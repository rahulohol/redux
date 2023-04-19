
import { add, GET_TODOS_FAILURE, GET_TODOS_REQUEST, GET_TODOS_SUCCESS, sub } from "./ActionTypes";

const initial = { count: 0, isLoading: false, isError: false, todos: [] };

const reduce = (oldState = initial, action) => {
  switch (action.type) {
    case add:
      return { ...oldState, count: oldState.count + action.payload };

    case sub:
      return { ...oldState, count: oldState.count - action.payload };

    case GET_TODOS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case GET_TODOS_SUCCESS:
      return {
        ...oldState,
        todo: action.payload,
        isLoading: false,
      };
    case GET_TODOS_FAILURE:
      return { ...oldState, isError: true, todo: [], isLoading: false };

    default:
      return oldState;
  }
};

export { reduce };
