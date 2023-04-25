import * as types from "./ActionType";

const initial = {
  isLoading: false,
  isError: false,
  todos: [],
};
const reducer = (oldState = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_TODOS_REQUEST:
      return { ...oldState, isLoading: true };
    case types.GET_TODOS_SUCCESS:
      return { ...oldState, isLoading: false, todos: payload };
    case types.GET_TODOS_FAILURE:
      return { ...oldState, isLoading: false, todos: [], isError: true };

    case types.ADD_TODOS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.ADD_TODOS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        // todos: [...oldState.todos, payload],
      };
    case types.ADD_TODOS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

    default:
      return oldState;
  }
};

export { reducer };
