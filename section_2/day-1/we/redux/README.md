# Class Notes  [Video](https://course.masaischool.com/lectures/38288)

# what we learn in this ?

- Redux

- React-Redux
    1. <Provider>    
    1. useSelector
    1. useDispatcher

# Step 
- Remove the initial state from the state.js file and add it as the default param in the reducer.js file, for oldState.
- Install the `redux` and `react-redux` library
- wrap our Application in the <Provider> component , and pass store as the only prop
- use the useSelector hook to access the data from the redux store
- use the useDispatch hook to access the dispatch method and update the state inside the redux store.




# <Provider>
- **In this we have to send data by props which is stored in store component of redux so ve pass in Provider as a prop in `index.js` file same as in `react` we use `AppContextProvider` way, and the draw-back of this is when many component are pass then the `UI` will render the all component wither other component will change or not they render all the component if one of the component will change**

# useSelector
- ***This is a hook to access the redux store's state. This hook is take a selector function as an argument .This Selector is called with the store state and useSelector have the call back function and  this will internally use `subscribe` functionality which we cover in day 3 redux in sprint 1***


## Todo's

1. Install `axios` and `json-server`
2. Create a script for running the json-server in the package.json file ,
"server":"json-server --watch db.json --port 8080"
3. Run this command, `npm run server` to run the json-server 
4. We would change the format of th db.json file, to store, our todo's.
5. We need to create some component, like Todos.jsx, and TodoInput.jsx.
6. Import Todos in App.js and TodoInput in Todo Component.




# Code

## first page store.js

```javascript

import {legacy_createStore} from 'redux';
import {reducer} from './Reducer'

const store=legacy_createStore(reducer);

export {store};

```


## second page Reducer.js

```javascript

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


```

## third Page  Action.js  & this is Redux folder page

```javascript
import {
  add,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  POST_TODO_FAILURE,
  POST_TODO_REQUEST,
  POST_TODO_SUCCESS,
  reduce,
} from "./ConstAction";

export const handleAdd = (payload) => {
  return { type: add, payload };
};

export const handleReduce = (payload) => {
  return { type: reduce, payload };
};

const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const getTodosSuccess = (payload) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload,
  };
};
const getTodosFailure = () => {
  return {
    type: GET_TODOS_FAILURE,
  };
};

const postTodoRequest = () => {
  return {
    type: POST_TODO_REQUEST,
  };
};
const postTodoSuccess = (payload) => {
  return {
    type: POST_TODO_SUCCESS,
    payload,
  };
};
const postTodoFailure = () => {
  return {
    type: POST_TODO_FAILURE,
  };
};

export {
  getTodosFailure,
  getTodosSuccess,
  getTodosRequest,
  postTodoRequest,
  postTodoFailure,
  postTodoSuccess,
};


```

## fourth Page  ConstAction.js


```javascript

export const add = "ADD";
export const reduce = "REDUCE";

export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

export const POST_TODO_REQUEST="POST_TODO_REQUEST"
export const POST_TODO_SUCCESS="POST_TODO_SUCCESS"
export const POST_TODO_FAILURE="POST_TODO_FAILURE"


```


## This is component page  first page counter.jsx

```javascript
// import { store } from "./Redux/Store";
import { handleAdd, handleReduce } from "../Redux/ActionType";
// import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  /* const {dispatch,subscribe}=store;
 
  const {count}=store.getState();

  const [counts, setCounts] = useState(0);

  subscribe(()=>{
    setCounts(prev=>prev+1)
  }) */

  // console.log(count)

  // instated of the prev code you can code this way in below code refer this

  // to access the redux store ,and to subscribe the data from the redux store.
  const count = useSelector((state) => state.count);

  //dispatch method along with actionObj,allows us to update the redux store.
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(handleAdd(2))}>Add</button>
      <button onClick={() => dispatch(handleReduce(1))}>Reduce</button>
    </div>
  );
}

export {Counter };


```

## this is second page Todo.jsx


```javascript
import React, { useEffect } from "react";
import { TodoInput } from "./TodoInput";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  postTodoFailure,
  postTodoRequest,
  postTodoSuccess,
} from "../Redux/ActionType";

function Todo() {
  const dispatch = useDispatch(); //this is from react-redux
  /*  const isLoading=useSelector((state)=>state.isLoading);
  const {todos}=useSelector((state)=>state.todos) */
  //both are same ☝️👇
  const { todos, isLoading, isError } = useSelector((state) => {
    return {
      todos: state.todos,
      isLoading: state.isLoading,
      isError: state.isError,
    };
  }, shallowEqual);

  const getTodo = () => {
    // this is for the request fetch and showing isLoading true
    dispatch(getTodosRequest());
    return axios
      .get("http://localhost:8080/Todos")
      .then((res) => {
        // this is for the api successfully pass and give with payload as the data
        dispatch(getTodosSuccess(res.data));
      })
      .catch((err) => {
        // this is for error occurs
        dispatch(getTodosFailure());
      });
  };
  // get all the todos that we have in the db.json file

  const addTodo = (title) => {
    if (title) {
      const payload = {
        title,
        status: false,
      };
      dispatch(postTodoRequest());
      return axios
        .post(" http://localhost:8080/Todos", payload)
        .then((res) => {
          dispatch(postTodoSuccess(res.data));
        })
        .catch((err) => {
          dispatch(postTodoFailure());
        });
    }
  };

  const handleAddTodo = (text) => {
    addTodo(text)
      .then(() => getTodo())
      .then(() => {
        console.log("Data added successfully");
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <TodoInput handleAddTodo={handleAddTodo} />
      )}
      {todos.length > 0 &&
        todos.map((items) => {
          return (
            <div key={items.id}>
              {items.title}-{items.status ? "True" : "False"}
            </div>
          );
        })}
    </div>
  );
}

export { Todo };


```

## this is third page TodoInput.jsx

```javascript
import React, { useState } from "react";

const TodoInput = ({ handleAddTodo }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      handleAddTodo(text);
      setText("");
    }
  };
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export { TodoInput };


```


## this is all contain page App.js

```javascript
// import {Counter} from "./component/Counter";
import "./App.css";
import { Todo } from "./component/Todo";


function App() {

  return <div>
    {/* <Counter /> */}
    <Todo />
  </div>;
}

export default App;


```